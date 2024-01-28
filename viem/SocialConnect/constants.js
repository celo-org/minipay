const { OdisContextName } = require("@celo/identity/lib/odis/query");
const { parseEther, createPublicClient, getContract, http } = require("viem");
const { celo, celoAlfajores } = require("viem/chains");
const { registryABI } = require("@celo/abis");

const ONE_CENT_CUSD = parseEther("0.01");

const NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000);
const chain = process.env.ENVIRONMENT === "TESTNET" ? celoAlfajores : celo;

const SERVICE_CONTEXT =
    process.env.ENVIRONMENT === "TESTNET"
        ? OdisContextName.ALFAJORES
        : OdisContextName.MAINNET;

const publicClient = createPublicClient({
    chain,
    transport: http(),
});

async function getCoreContractAddress(contractName) {
    const registryContract = getContract({
        address: "0x000000000000000000000000000000000000ce10",
        abi: registryABI,
        publicClient,
    });

    return await registryContract.read.getAddressForStringOrDie([contractName]);
}

module.exports = {
    ONE_CENT_CUSD,
    NOW_TIMESTAMP,
    chain,
    SERVICE_CONTEXT,
    publicClient,
    getCoreContractAddress,
};
