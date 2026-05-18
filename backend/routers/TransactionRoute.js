const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const AuthMiddleware = require('../middlewares/middleware')


router.post('/addTransaction',AuthMiddleware,TransactionController.addTransaction)
router.get('/getTransactions',TransactionController.getTransaction)
router.put('/updateTransaction/:id',TransactionController.updateTransaction)
router.delete('/deleteTransaction/:id',TransactionController.deleteTransaction)

module.exports = router