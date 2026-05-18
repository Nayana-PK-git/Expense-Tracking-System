const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userID : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        enum : ['income','expense'],
        required : true
    },
    category : {
        type : String,
        required:true
    },
    date : {
        type : Date,
        required : true
    }

},{timestamps:true})


module.exports = mongoose.model('Transactions',transactionSchema)