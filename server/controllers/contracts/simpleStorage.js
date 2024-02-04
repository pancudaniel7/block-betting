const { retrieve, store } = require("../../middleware/contracts/simpleStorage");

const retrieveData = async (req, res) => {
  try {
    const result = await retrieve();
    if (!result.success) {
      return res.status(500).send({ error: result.error });
    }

    res.send({ value: result.value });
  } catch (error) {
    return res.status(500).send({ error: "Fail to retrieve data" });
  }
};

const storeData = async (req, res) => {
  try {
    const { value } = req.body;
    if (value === undefined) {
      return res.status(400).send({ error: "value is required" });
    }

    const result = await store(value);
    if (!result.success) {
      return res.status(500).send({ error: "Fail to store data" });
    }

    res.send({ message: "Data stored successfully", trasnactionHash: result.transaction });
  } catch (error) {
    return res.status(500).send({ error: "Fail to store data" });
  }
};

module.exports = { retrieveData, storeData };
