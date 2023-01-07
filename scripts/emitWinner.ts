import { ethers } from "hardhat";
import {
  AlderianAnnatarToken,
  AlderianAnnatarToken__factory,
} from "../typechain-types";
import bucketAbi from "./bucket.abi.json";

let recipient = ""; // Put an address here to receive token airdrop executing this script
const AATContractAddress = "0xb5F74888236A21B3f51CcFfB797025656Db5C72F";
const amount = "0.0001";
const bucketAddress = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
async function main() {
  const [owner, addr1] = await ethers.getSigners();

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

  const amountToTransfer = ethers.utils.parseEther(amount);

  // Allow bucket to expend
  let allowTx = await AATContract.connect(owner).approve(
    bucketAddress,
    amountToTransfer
  );

  // Wait for allowed event
  const rc = await allowTx.wait(); // 0ms, as tx is already confirmed
  const event = rc.events?.find((event) => event.event === "Approval");
  console.log("Approval event", event?.args);

  // Do drop call
  const bucket = await ethers.getContractAt(bucketAbi, bucketAddress);

  let dropTx = await bucket.drop(AATContractAddress, amountToTransfer);

  // Wait for winner event
  const rc1 = await allowTx.wait(); // 0ms, as tx is already confirmed
  const event1 = rc.events?.find((event) => event.event === "Approval");
  console.log("Winner event", event1?.args);

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
