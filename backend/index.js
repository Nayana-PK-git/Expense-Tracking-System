const express = require('express')
const app = express()
const connectDB= require('./config/db')
connectDB()

const UserRoute = require('./routes/UserRoute')
const TransactionRoute = require('./routes/TransactionRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use('/user',UserRoute)
app.use('/transaction',TransactionRoute)

app.listen(3000,() =>{
    console.log("server running");
    
})