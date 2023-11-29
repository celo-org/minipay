const { createPublicClient, http } = require("viem");
const { celo } = require("viem/chains");

const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
});

async function main() {
    return publicClient;
}

main()
    .then((result) => console.log(result))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
