import { ethers } from "hardhat";

async function main() {
  const ContractOwner = await ethers.deployContract("ContractOwner");

  await ContractOwner.waitForDeployment();

  console.log(
    `ContractOwner contract deployed to ${ContractOwner.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
