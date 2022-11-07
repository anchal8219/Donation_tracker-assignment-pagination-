const mongoose = require("mongoose");
const donationModel = require("../model/donation");

const createDon = async(req,res)=>{
    const {from_creator ,to_creator, currency, amount , Name , Message}=req.body;
    const newDon = new donationModel({
        from_creator:from_creator ,
        to_creator: to_creator,
        currency:currency,
        amount:amount,
        Name:Name,
        Message:Message,
        userId: req.userId
    })
    try{
        await newDon.save();
        res.status(201).json(newDon);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"})
    }
}
const getDonatordetails = async(req,res)=> {
    try{
        const donators= await donationModel.find({userId: req.userId});
        res.status(200).json(donators) 
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"})
    }

}

module.exports = {
    getDonatordetails
}