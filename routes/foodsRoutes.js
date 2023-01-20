const express = require('express')
const foodsRouter = express.Router()
const foodsController = require('../controllers/foodsController')

foodsRouter.get('/', foodsController.getAllFoods)


module.exports = foodsRouter;