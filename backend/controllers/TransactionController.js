const Transaction = require('../models/TransactionModel')

const addTransaction = async(req,res) => {
    const{amount,type,category,date} = req.body
    try {
        const newdata = await new Transaction({
            userID:req.user.id,
            amount,
            type,
            category,
            date
        })
        await newdata.save()
        res.status(200).json({msg:"Transaction successful",data:newdata})
    } catch (error) {
        res.status(500).json({msg:"server error"})
        console.log(error);
        
    }
}


const getTransaction = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {addTransaction}