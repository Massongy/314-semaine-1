const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')


// define the home page route
router.get('/users', controller.getUsers)
router.get('/users/:id', controller.getUser)
router.post('/users', controller.createUser)
router.patch('/users/:id', controller.modifyUser)
router.delete('/users/:id', controller.deleteUser)


module.exports = router
