const {
  web3,
  contracts,
  account,
  privateKey,
  maxPriorityFeePerGas,
  maxFeePerGas,
} = require("../../config/web3");

const retrieve = async () => {
  const simpleStorageContract = contracts["simpleStorage"];
  try {
    const data = await simpleStorageContract.methods.retrieve().call();
    const storedValue = Number(data);
    return { success: true, value: storedValue };
  } catch (error) {
    console.error("Fail to retrieve data:", error);
    return { success: false, error: error.toString() };
  }
};

const store = async (value) => {
  const simpleStorageContract = contracts["simpleStorage"];
  try {
    const storeMethod = simpleStorageContract.methods.store(value);

    const estimatedGas = await storeMethod.estimateGas({ from: account });

    const transaction = {
      from: account,
      to: simpleStorageContract.options.address,
      gas: estimatedGas.toString(),
      maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
      maxFeePerGas: maxFeePerGas.toString(),
      data: storeMethod.encodeABI(),
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    return { success: true, transaction: receipt.transactionHash };


  } catch (error) {
    console.error("Fail to store data:", error);
    return { success: false, error: error.toString() };
  }
};

module.exports = { retrieve, store };
