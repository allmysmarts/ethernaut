const {ethers} = require("hardhat");

async function main() {
    [deployer] = await ethers.getSigners();

    const Fallback = await ethers.getContractFactory("Fallback");
    const fallback = await Fallback.deploy();
    await fallback.deployed();
    console.log("Fallback: ", fallback.address);

    const FallbackGasTester = await ethers.getContractFactory("FallbackGasTester");
    const fallbackGasTester = await FallbackGasTester.deploy(fallback.address);
    await fallbackGasTester.deployed();
    console.log("FallbackGasTester: ", fallbackGasTester.address);

    await fallbackGasTester.test1({
        value: ethers.utils.parseEther("0.1")
    });

    await fallbackGasTester.test2({
        value: ethers.utils.parseEther("0.1")
    });

    await fallbackGasTester.test3({
        value: ethers.utils.parseEther("0.1")
    });
/*
    await run("verify:verify", {
        address: fallback.address,
        contract: "contracts/FallbackTest.sol:Fallback",
        constructorArguments: []
    });

    await run("verify:verify", {
        address: fallbackGasTester.address,
        contract: "contracts/FallbackTest.sol:FallbackGasTester",
        constructorArguments: [
            fallback.address
        ]
    });
*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
