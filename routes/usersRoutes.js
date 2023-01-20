const express = require('express')
const usersRouter = express.Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.getAllUsers)

usersRouter.get('/total', usersController.countUsers)

usersRouter.get('/:username', usersController.getUser)






module.exports = usersRouter;