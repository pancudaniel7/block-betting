const express = require('express');
const router = express.Router();
const { retrieveData, storeData } = require('../../../controllers/contracts/simpleStorage'); // Adjust path as necessary

router.get('/', async (req, res) => {
    await retrieveData(req, res);
});

router.post('/', async (req, res) => {
    await storeData(req, res);
});

module.exports = router;
