const express = require('express')
const router = express.Router()
const UserController=require('../controllers/UserController')

router.post('/registeruser',UserController.registerUser)
router.post('/loginuser',UserController.userLogin)
router.post('/logoutuser',UserController.userLogout)
router.get('/me',UserController.getMe)

module.exports = router