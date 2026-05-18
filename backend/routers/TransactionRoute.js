const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const AuthMiddleware = require('../middlewares/middleware')


router.post('/addTransaction',AuthMiddleware,TransactionController.transaction)

module.exports = router