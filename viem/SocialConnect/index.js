const { getContract } = require("viem");
const {
    getCoreContractAddress,
    publicClient,
    SERVICE_CONTEXT,
    NOW_TIMESTAMP,
} = require("./constants");
const {
    federatedAttestationsABI,
    odisPaymentsABI,
    stableTokenABI,
} = require("@celo/abis");
const { OdisUtils } = require("@celo/identity");

class SocialConnectIssuer {
    walletClient;
    authSigner;

    federatedAttestationsContractAddress;
    federatedAttestationsContract;

    odisPaymentsContractAddress;
    odisPaymentsContract;

    stableTokenContractAddress;
    stableTokenContract;

    serviceContext;
    initialized = false;

    constructor(walletClient, authSigner) {
        this.walletClient = walletClient;
        this.authSigner = authSigner;
        this.serviceContext =
            OdisUtils.Query.getServiceContext(SERVICE_CONTEXT);
    }

    async initialize() {
        this.federatedAttestationsContractAddress =
            await getCoreContractAddress("FederatedAttestations");

        this.federatedAttestationsContract = getContract({
            address: this.federatedAttestationsContractAddress,
            abi: federatedAttestationsABI,

            // Needed for lookup
            publicClient,

            // Needed for registeration and de-registration
            walletClient: this.walletClient,
        });

        this.odisPaymentsContractAddress = await getCoreContractAddress(
            "OdisPayments"
        );
        this.odisPaymentsContract = getContract({
            address: this.odisPaymentsContractAddress,
            abi: odisPaymentsABI,
            walletClient: this.walletClient,
        });

        this.stableTokenContractAddress = await getCoreContractAddress(
            "StableToken"
        );
        this.stableTokenContract = getContract({
            address: this.stableTokenContractAddress,
            abi: stableTokenABI,
            walletClient: this.walletClient,
        });

        this.initialized = true;
    }

    async #getObfuscatedId(plaintextId, identifierType) {
        // TODO look into client side blinding
        const { obfuscatedIdentifier } =
            await OdisUtils.Identifier.getObfuscatedIdentifier(
                plaintextId,
                identifierType,
                this.walletClient.account.address,
                this.authSigner,
                this.serviceContext
            );
        return obfuscatedIdentifier;
    }

    async #checkAndTopUpODISQuota() {
        const remainingQuota = await this.checkODISQuota();

        if (remainingQuota < 1) {
            // TODO make threshold a constant
            let approvalTxHash =
                await this.stableTokenContract.write.increaseAllowance([
                    this.odisPaymentsContractAddress,
                    ONE_CENT_CUSD, // TODO we should increase by more
                ]);

            let approvalTxReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: approvalTxHash,
                });

            let odisPaymentTxHash =
                await this.odisPaymentsContract.write.payInCUSD([
                    this.walletClient.account,
                    ONE_CENT_CUSD, // TODO we should increase by more
                ]);

            let odisPaymentReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: odisPaymentTxHash,
                });
        }
    }

    async getObfuscatedIdWithQuotaRetry(plaintextId, identifierType) {
        if (this.initialized) {
            try {
                return await this.#getObfuscatedId(plaintextId, identifierType);
            } catch {
                await this.#checkAndTopUpODISQuota();
                return this.#getObfuscatedId(plaintextId, identifierType);
            }
        }
        throw new Error("SocialConnect instance not initialized");
    }

    async registerOnChainIdentifier(plaintextId, identifierType, address) {
        if (this.initialized) {
            const obfuscatedId = await this.getObfuscatedIdWithQuotaRetry(
                plaintextId,
                identifierType
            );

            const hash =
                await this.federatedAttestationsContract.write.registerAttestationAsIssuer(
                    [
                        // TODO check if there are better code patterns for sending txs
                        obfuscatedId,
                        address,
                        NOW_TIMESTAMP,
                    ]
                );

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            return receipt;
        }
        throw new Error("SocialConnect instance not initialized");
    }

    async deregisterOnChainIdentifier(plaintextId, identifierType, address) {
        if (this.initialized) {
            const obfuscatedId = await this.getObfuscatedIdWithQuotaRetry(
                plaintextId,
                identifierType
            );
            const hash =
                await this.federatedAttestationsContract.write.revokeAttestation(
                    [obfuscatedId, this.walletClient.account.address, address]
                );

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            return receipt;
        }
        throw new Error("SocialConnect instance not initialized");
    }

    async checkODISQuota() {
        if (this.initialized) {
            const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
                this.walletClient.account.address,
                this.authSigner,
                this.serviceContext
            );
            console.log("Remaining Quota", remainingQuota);
            return remainingQuota;
        }
        throw new Error("SocialConnect instance not initialized");
    }

    async lookup(plaintextId, identifierType, issuerAddresses) {
        if (this.initialized) {
            const obfuscatedId = await this.getObfuscatedIdWithQuotaRetry(
                plaintextId,
                identifierType
            );

            const attestations =
                await this.federatedAttestationsContract.read.lookupAttestations(
                    [obfuscatedId, issuerAddresses]
                );

            return {
                accounts: attestations[1], // Viem returns data as is from contract not in JSON
                obfuscatedId,
            };
        }
        throw new Error("SocialConnect instance not initialized");
    }
}

module.exports = {
    SocialConnectIssuer,
};
