const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltround = 10
const registerUser = async(req,res)=>{
    const{name,email,password}=req.body
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:"User already exist"})
        }
        const hashedpassword = await bcrypt.hash(password,saltround)
        const userdata = await new User({
            name,
            email,
            password:hashedpassword
        })
        await userdata.save()
        res.status(201).json({msg:"user created successfully"})
    }catch(error){
        res.status(500).json({msg:"server error"})
    }
}



const userLogin = async(req,res)=>{
    const{email,password}=req.body
    
    try {
        const user = await User.findOne({email})
        console.log(user);
        
        if(!user){
            return res.status(404).json({msg:"user not found,please register"})
        }
        const Matchpassword = await bcrypt.compare(password,user.password)
        console.log(Matchpassword);
        
        if(!Matchpassword){
            return res.status(404).json({msg:"Invalid password"})
        }
        const token = jwt.sign({id:user._id,name:user.name},process.env.SECRET_KEY,{expiresIn:'1h'})
        res.status(200).json({msg:"loggedin successfully",token:token})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}


module.exports = {registerUser,userLogin}