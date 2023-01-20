const express = require('express')
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.getAllUsers)

usersRouter.get('/total', usersController.countUsers)

usersRouter.get('/vehicles', usersController.usersByVehicle)

usersRouter.get('/:searchUser', usersController.getUser)


module.exports = usersRouter;