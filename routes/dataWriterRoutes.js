const express = require('express')
const dataRouter = express.Router();
const dataWriter = require('../controllers/dataWriterController')

dataRouter.post('/save', dataWriter)

module.exports = dataRouter;