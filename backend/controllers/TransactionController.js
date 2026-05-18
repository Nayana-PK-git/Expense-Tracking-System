const Transaction = require('../models/TransactionModel')

const addTransaction = async(req,res) => {
    try {
        const{amount,type,category,date} = req.body

        if(!amount || amount <= 0){
            return res.status(400).json({msg:"Amount must be greater than 0"})
        }

        if(!['income','expense'].includes(type)){
            return res.status(400).json({msg:"Invalid transaction type"})
        }
        const newdata = await new Transaction({
            userID:req.user.id,
            amount: Number(amount),
            type,
            category,
            date:date || Date.now(),
        })
        await newdata.save()
        res.status(200).json({msg:"Transaction successful"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
        console.log(error);
        
    }
}


const getTransaction = async(req,res) => {
    try {
        const transactions = await Transaction.find({user:req.user.id}).sort({createdAt:-1});
        res.status(200).json({msg:"All transactions"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const updateTransaction = async(req,res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({msg:"Transaction not found"})
        }

        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"})
        }

        const {amount,type,category,date} =req.body

        transaction = await Transaction.findByIdAndUpdate(req.params.id,{amount,type,category,date},{new:true, runValidators:true})
        res.json(transaction)
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}


const deleteTransaction = async(req,res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction){
            return res.status(404).json({msg:"Transaction not found"})
        }

        if(transaction.user.toString() !== req.user.id){
            return res.status(401).json({msg:"Not authorized"})
        }

        await Transaction.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"Transaction removed",id:req.params.id})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

module.exports = {addTransaction, getTransaction, updateTransaction, deleteTransaction}