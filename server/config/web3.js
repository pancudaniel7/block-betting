require("dotenv").config();
const { Web3 } = require("web3");

const networkUrl = process.env.NETWORK_RPC_URL || "https://rpc2.sepolia.org";
const web3 = new Web3(networkUrl);

const account = process.env.ACCOUNT_ADDRESS;
const privateKey = process.env.ACCOUNT_PRIVATE_KEY;

const maxPriorityFeePerGas = web3.utils.toWei(
  process.env.MAX_PRIORITY_FEE_PER_GAS_GWEI,
  "gwei"
);
let maxFeePerGas = web3.utils.toWei(process.env.MAX_FEE_PER_GAS_GWEI, "gwei");

const simpleStorageContractABI = require("../abis/SimpleStorageABI.json");
const simpleStorageContractAddress =
  process.env.CONTRACTS_ADDRESS_SIMPLE_STORAGE;
const simpleStorageContract = new web3.eth.Contract(
  simpleStorageContractABI,
  simpleStorageContractAddress
);

const contracts = {
  simpleStorage: simpleStorageContract,
};

module.exports = {
  web3,
  contracts,
  account,
  privateKey,
  maxPriorityFeePerGas,
  maxFeePerGas,
};
