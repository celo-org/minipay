const { Contract, ethers } = require("ethers");
const { OdisUtils } = require("@celo/identity");
const {
    federatedAttestationsABI,
    odisPaymentsABI,
    stableTokenABI,
} = require("@celo/abis");
const {
    getCoreContractAddress,
    ONE_CENT_CUSD,
    NOW_TIMESTAMP,
    SERVICE_CONTEXT,
} = require("./constants");

class SocialConnectIssuer {
    wallet;
    authSigner;

    federatedAttestationsContract;
    odisPaymentsContract;
    stableTokenContract;
    serviceContext;

    initialized = false;

    constructor(wallet, authSigner) {
        this.wallet = wallet;
        this.authSigner = authSigner;
        this.serviceContext =
            OdisUtils.Query.getServiceContext(SERVICE_CONTEXT);
    }

    async initialize() {
        this.federatedAttestationsContract = new Contract(
            await getCoreContractAddress("FederatedAttestations"),
            federatedAttestationsABI,
            this.wallet
        );

        this.odisPaymentsContract = new Contract(
            await getCoreContractAddress("OdisPayments"),
            odisPaymentsABI,
            this.wallet
        );

        this.stableTokenContract = new Contract(
            await getCoreContractAddress("StableToken"),
            stableTokenABI,
            this.wallet
        );

        this.initialize = true;
    }

    async #getObfuscatedId(plaintextId, identifierType) {
        // TODO look into client side blinding
        const { obfuscatedIdentifier } =
            await OdisUtils.Identifier.getObfuscatedIdentifier(
                plaintextId,
                identifierType,
                this.wallet.address,
                this.authSigner,
                this.serviceContext
            );
        return obfuscatedIdentifier;
    }

    async #checkAndTopUpODISQuota() {
        const remainingQuota = await this.checkODISQuota();

        if (remainingQuota < 1) {
            // TODO make threshold a constant
            const approvalTxReceipt = (
                await this.stableTokenContract.increaseAllowance(
                    this.odisPaymentsContract.address,
                    ONE_CENT_CUSD // TODO we should increase by more
                )
            ).wait();

            const odisPaymentTxReceipt = (
                await this.odisPaymentsContract.payInCUSD(
                    this.wallet.address,
                    ONE_CENT_CUSD // TODO we should increase by more
                )
            ).wait();
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

            const tx =
                await this.federatedAttestationsContract.registerAttestationAsIssuer(
                    // TODO check if there are better code patterns for sending txs
                    obfuscatedId,
                    address,
                    NOW_TIMESTAMP
                );

            const receipt = await tx.wait();
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
            const tx =
                await this.federatedAttestationsContract.revokeAttestation(
                    obfuscatedId,
                    this.wallet.address,
                    address
                );
            const receipt = await tx.wait();
            return receipt;
        }
        throw new Error("SocialConnect instance not initialized");
    }

    async checkODISQuota() {
        if (this.initialized) {
            const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
                this.wallet.address,
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
                await this.federatedAttestationsContract.lookupAttestations(
                    obfuscatedId,
                    issuerAddresses
                );

            return {
                accounts: attestations.accounts, // TODO typesafety
                obfuscatedId,
            };
        }
        throw new Error("SocialConnect instance not initialized");
    }
}

module.exports = {
    SocialConnectIssuer,
};
