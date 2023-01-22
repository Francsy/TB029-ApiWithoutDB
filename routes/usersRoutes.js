const express = require('express')
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.getAllUsers)

usersRouter.get('/total', usersController.countUsers)

usersRouter.get('/vehicles', usersController.usersByVehicle)


usersRouter.get('/:searchUser', usersController.getUser)


usersRouter.post('/', usersController.createUser)

usersRouter.put('/:username', usersController.updateUser)

usersRouter.put('/:username/vehicles', usersController.addVehicles)

usersRouter.put('/:username/foods', usersController.addFoods)

usersRouter.put('/:username/hide', usersController.hideUser)

usersRouter.delete('/:username', usersController.deleteUser)


module.exports = usersRouter;