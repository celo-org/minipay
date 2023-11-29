const ethers = require("ethers");
const { providers } = ethers;

const provider = new providers.JsonRpcProvider("https://forno.celo.org");

async function main() {}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
