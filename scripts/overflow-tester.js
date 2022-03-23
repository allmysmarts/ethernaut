const {ethers} = require("hardhat");

async function main() {
    [deployer] = await ethers.getSigners();

    const OverflowTest = await ethers.getContractFactory("OverflowTest");
    const overflowTester = await OverflowTest.deploy();
    await overflowTester.deployed();
    console.log("OverflowTest: ", overflowTester.address);

    uncheckedResult = await overflowTester.uncheckedSub(2, 3);
    console.log("Unchecked Subtract Result: ", uncheckedResult.toHexString());

    checkedResult = await overflowTester.checkedSub(2, 3);
    console.log("Checked Subtract Result: ", checkedResult);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
