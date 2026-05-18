const express = require('express')
const app = express()
const connectDB= require('./config/db')
connectDB()

const UserRoute = require('./routers/UserRoute')
const TransactionRoute = require('./routers/TransactionRoute')
app.use(express.json())
app.use('/user',UserRoute)
app.use('/transaction',TransactionRoute)

app.listen(3000,() =>{
    console.log("server running");
    
})