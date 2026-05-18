const express = require('express')
const router = express.Router()
const UserController=require('../controllers/UserController')

router.post('/createuser',UserController.registerUser)
router.post('/loginuser',UserController.userLogin)

module.exports = router