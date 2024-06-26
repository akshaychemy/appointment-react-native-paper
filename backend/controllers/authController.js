import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const generatToken=(user)=>{
    const token = jwt.sign({id: user._id},process.env.TOKEN_SECRET)
    return token
}


export const login = async (req,res)=>{
    const username =req.body.username
    const password =req.body.password
    
    try{
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        if(user && await bcrypt.compare(password,user.password)){
            const token= generatToken(user)
            return res.status(200).json({message: "User logged in successfully","token":token,"user":{user}})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const registerUser = async (req,res)=>{
    const role =req.body.role
    const username =req.body.username
    const password =req.body.password
    
    try{
        const existUser = await User.findOne({username: username})

        if(existUser){
            return res.status(400).json({message: "User already exist"})
        }

        const salt= await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username: username,
            password: hashpassword,
            role: role
        })
        await newUser.save();

        res.status(201).json({message: "User created successfully"})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}