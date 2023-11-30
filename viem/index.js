const { createPublicClient, http } = require("viem");
const { celo } = require("viem/chains");
const { checkCUSDBalance } = require("./checkCUSDBalance");

const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

async function main() {
    // return await checkCUSDBalance(
    //     publicClient,
    //     "0x765de816845861e75a25fca122bb6898b8b1282a"
    // );
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
