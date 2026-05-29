const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltround = 10


const registerUser = async(req,res)=>{
    try{
        const{name,email,password,confirmpassword}=req.body
        console.log('Register request:',req.body);
        
        if(password !== confirmpassword){
            return res.status(400).json({msg:"password does not match"})
        }

        if(password.length <6){
            return res.status(400).json({msg:"password has atleast 6 characters"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:"User already exist"})
        }
        const hashedpassword = await bcrypt.hash(password,saltround)
        const userdata = await new User({
            name,
            email,
            password:hashedpassword,
        })
        await userdata.save()
        const token = jwt.sign({id:userdata._id,name:userdata.name},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.cookie("token",token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:24 * 60 * 60 * 1000
        })
        res.status(201).json({msg:"user created successfully"})
    }catch(error){
        console.log('register error',error);
        
        res.status(500).json({msg:"server error"})
    }
}



const userLogin = async(req,res)=>{    
    try {
        const{email,password}=req.body
        console.log('Login attempt for:',email);
        
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
        const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:'1h'})

        //setting cookie
        res.cookie("token",token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:24 * 60 * 60 * 1000
        })
        res.status(200).json({msg:"loggedin successfully",token:token})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

const userLogout = async(req,res) => {
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(201).json({msg:"Logged out"})
}

const getMe = async(req,res) => {
    res.json({ user : req.user})
}


module.exports = {registerUser,userLogin,userLogout,getMe}