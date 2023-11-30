const { formatEther } = require("ethers/lib/utils");

async function estimateGasPrice(provider, feeCurrency = "") {
    let gasPriceinHex = await provider.send(
        "eth_gasPrice",
        feeCurrency ? [feeCurrency] : []
    );

    return formatEther(gasPriceinHex);
}

module.exports = {
    estimateGasPrice,
};
