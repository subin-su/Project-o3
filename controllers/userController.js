const User = require('../models/userModel')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();

module.exports={
    register:async (req,res)=>{
        try{
            const {email,password,passwordCheck,firstName,lastName}=req.body;
            console.log(req.body)
            if(!email || !password || !passwordCheck || !firstName||!lastName){
                
             return res.send("Not all fields entered") 
            }
            if(password.length<8){
               return res.status(400).send({msg:'Password must be at least 8 character'})
               
            }
            if(password!==passwordCheck){
                res.status(400).json({msg:'Password does not match'})
            }
            const existingUser= await User.findOne({email:email});
            if(existingUser){
               return res.status(400).json({msg:'User already exists'})
            }
           
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password,salt)
            
            const newUser=new User({
                email,
                password:passwordHash,
                firstName,
                lastName
            })
            const saveUser=await newUser.save()
            res.json(saveUser)

        } catch(err){
            res.status(500).json({msg:err})
        }

    },
    login:async(req,res)=>{
        try{
    const {email,password}=req.body
    if(!email|| !password){
    return res.status(400).json({msg:"enter input field"})
    }
    const user=await User.findOne({email:email})
    if(!user){
     return   res.status(400).json({msg:'User does not exist'})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
     return   res.status(400).json({msg:'Password does not match'})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'24h'
    })
    res.json({token,user:{id:user._id,firstName:user.firstName}})
        } catch (err) {
          return  res.status(500).json({msg:err})
        }
        },
        getUser:async (req,res)=>{
            try{
                const user=await User.findById(req.user);
                console.log(req.user)
                res.json({
                    firstName:user.firstName,
                    id:user._id,
                })
                console.log(user)
                
            }catch(err){
                res.send(err.response)
            }
           
            
        }
}