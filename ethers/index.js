const ethers = require("ethers");
const { providers } = ethers;
const { checkCUSDBalance } = require("./checkCUSDBalance");

const provider = new providers.JsonRpcProvider("https://forno.celo.org");

async function main() {
    // return await checkCUSDBalance(
    //     provider,
    //     "0x765de816845861e75a25fca122bb6898b8b1282a"
    // );
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
