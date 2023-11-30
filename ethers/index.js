const ethers = require("ethers");
const { providers } = ethers;
const { estimateGasPrice } = require("./estimateGasPrice");
const { STABLE_TOKEN_ADDRESS } = require("../constants");

const provider = new providers.JsonRpcProvider("https://forno.celo.org");

async function main() {
    // return await estimateGasPrice(provider);
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
