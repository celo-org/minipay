const { Contract, ethers } = require("ethers");
const { registryABI } = require("@celo/abis");
const { OdisContextName } = require("@celo/identity/lib/odis/query");

// 1 Credit = 0.001 cUSD
const ONE_CENT_CUSD = ethers.utils.parseEther("0.01");

const NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000);

const RPC =
    process.env.ENVIRONMENT === "TESTNET"
        ? "https://alfajores-forno.celo-testnet.org"
        : "https://forno.celo.org";

const SERVICE_CONTEXT =
    process.env.ENVIRONMENT === "TESTNET"
        ? OdisContextName.ALFAJORES
        : OdisContextName.MAINNET;

const provider = new ethers.providers.JsonRpcProvider(RPC);

async function getCoreContractAddress(contractName) {
    const registryContract = new Contract(
        "0x000000000000000000000000000000000000ce10",
        registryABI,
        provider
    );

    return await registryContract.getAddressForStringOrDie(contractName);
}

module.exports = {
    ONE_CENT_CUSD,
    NOW_TIMESTAMP,
    RPC,
    SERVICE_CONTEXT,
    provider,
    getCoreContractAddress,
};
