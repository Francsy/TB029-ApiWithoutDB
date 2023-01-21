const express = require('express')
const vehiclesRouter = express.Router();
const vehiclesController = require('../controllers/vehiclesController')

vehiclesRouter.get('/', vehiclesController.getVehicles)

module.exports = vehiclesRouter