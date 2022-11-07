const userModel = require("../model/logSchema");
const pageModel = require("../model/pagination");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "DONATIONAPI";

const signup = async(req,res)=>{   
    const {username , password , confirm_password} = req.body;
    try{
        const existUsername = await userModel.findOne({username : username})
        if(existUsername){
            return res.status(400).json({message: "username already exists "})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedConfirmPassword = await bcrypt.hash(confirm_password, salt);

        const result = await userModel.create({
            username: username,
            password: hashedPassword,
            confirm_password: hashedConfirmPassword
        })

        const token = jwt.sign({username: result.username , id : result._id }, SECRET_KEY)
        res.status(201).json({user: result, token:token});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }


}

const login = async (req,res)=>{
    const {username,password} = req.body;
    try{
        const existUsername = await userModel.findOne({username : username})
        if(!existUsername){
            return res.status(404).json({message: "user not found"})
        } 
        const matchPassword = await bcrypt.compare(password, existUsername.password)
        if(!matchPassword){
            return res.status(400).json({message: "invalid credentials"});

        }
        const token = jwt.sign({username: existUsername.username , id : existUsername._id }, SECRET_KEY)
        // res.status(201).json({user: existUsername, token:token});
        res.status(201).json({message: "logged in!"});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});

    }
}


const pagination = async(req,res)=>{
    try{
        let {page=1,limit=5} = req.body;
        // if(!page) page=1;       
        // if(!limit) limit=10;
        const pagination = await pageModel.find().limit(limit *1).skip((page-1)*limit);
        res.status(200).json({total: pagination.length,page:page,limit:limit, pagination});
    }catch(error){
                console.log(error);
                res.status(500).json({message: "something went wrong"});
    }
}

module.exports = {signup, login , pagination}