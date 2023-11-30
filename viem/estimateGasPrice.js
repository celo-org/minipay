const { formatEther, hexToBigInt } = require("viem");

async function estimateGasPrice(publicClient, feeCurrency = "") {
    return formatEther(
        hexToBigInt(
            await publicClient.request({
                method: "eth_gasPrice",
                params: feeCurrency ? [feeCurrency] : [],
            })
        )
    );
}

module.exports = {
    estimateGasPrice,
};
