const { createPublicClient, http, hexToBigInt, formatEther } = require("viem");
const { celo } = require("viem/chains");
const { estimateGasPrice } = require("./estimateGasPrice");
const { STABLE_TOKEN_ADDRESS } = require("../constants");
const { estimateGas } = require("./estimateGas");

const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

async function main() {
    let gasLimit = await estimateGas(
        publicClient,
        {
            account: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
            to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
            value: "0x1",
            data: "0x",
        },
        STABLE_TOKEN_ADDRESS
    );

    let gasPrice = await estimateGasPrice(publicClient, STABLE_TOKEN_ADDRESS);

    return formatEther(gasLimit * hexToBigInt(gasPrice));
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
