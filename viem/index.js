const { createPublicClient, http } = require("viem");
const { celo } = require("viem/chains");
const { estimateGasPrice } = require("./estimateGasPrice");
const { STABLE_TOKEN_ADDRESS } = require("../constants");

const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

async function main() {
    // return await estimateGasPrice(publicClient);
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
