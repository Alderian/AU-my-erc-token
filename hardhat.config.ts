import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_GOERLI_URL || "F";
const GOERLI_MNEMONIC = process.env.GOERLI_MNEMONIC || "test ".repeat(23) + "trash";
// const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "0".repeat(64);
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: ALCHEMY_GOERLI_URL,
      accounts: { mnemonic: GOERLI_MNEMONIC },
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
