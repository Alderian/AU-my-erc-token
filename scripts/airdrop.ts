import { ethers } from "hardhat";
import {
  AlderianAnnatarToken,
  AlderianAnnatarToken__factory,
} from "../typechain-types";

let recipient = ""; // Put an address here to receive token airdrop executing this script
const AATContractAddress = "0xb5F74888236A21B3f51CcFfB797025656Db5C72F";
const airdropAmount = "0.0001";

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  if (!recipient) recipient = addr1.address;

  const AATContract = <AlderianAnnatarToken>(
    new ethers.Contract(
      AATContractAddress,
      AlderianAnnatarToken__factory.abi,
      owner
    )
  );

  // Current owner balance
  let ownerBalance = await AATContract.balanceOf(owner.address);
  console.log(
    "AAT Owner balance:",
    ethers.utils.formatEther(ownerBalance),
    ownerBalance
  );

  // Try to tranfer some amount to recipient
  console.log(
    `Transfering ${airdropAmount} AAT (${ethers.utils.parseEther(
      airdropAmount
    )})`
  );

  await AATContract.connect(owner)
    .transfer(recipient, ethers.utils.parseEther(airdropAmount))
    .then((tx) => console.log(tx))
    .catch((e) => console.log("something went wrong", e));

  const recipientBalance = await AATContract.balanceOf(recipient);
  console.log(
    "AAT recipient new balance:",
    ethers.utils.formatEther(recipientBalance),
    recipientBalance
  );

  ownerBalance = await AATContract.balanceOf(owner.address);
  console.log(
    "AAT Owner new balance:",
    ethers.utils.formatEther(ownerBalance),
    ownerBalance
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
