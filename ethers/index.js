const ethers = require("ethers");
const { providers, BigNumber } = ethers;
const { STABLE_TOKEN_ADDRESS } = require("../constants");
const { estimateGas } = require("./estimateGas");
const { estimateGasPrice } = require("./estimateGasPrice");
const { formatEther } = require("ethers/lib/utils");

const provider = new providers.JsonRpcProvider("https://forno.celo.org");

async function main() {
    let gasPrice = await estimateGasPrice(provider, STABLE_TOKEN_ADDRESS);

    let gasLimit = await estimateGas(
        provider,
        {
            from: "0x8eb02597d85abc268bc4769e06a0d4cc603ab05f",
            to: "0x4f93fa058b03953c851efaa2e4fc5c34afdfab84",
            value: "0x1",
            data: "0x",
        },
        STABLE_TOKEN_ADDRESS
    );

    return formatEther(
        BigNumber.from(gasLimit).mul(BigNumber.from(gasPrice)).toString()
    );
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
