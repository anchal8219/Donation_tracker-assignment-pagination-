// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required:true,
//         unique: true,
//         min: 6,
//         max: 255
//     },
//     password: {
//         type: String,
//         required: true,
//         max: 1024,
//         min: 6
//     },
//     confirm_password: {
//         type: String,
//         required: true,
//         max: 1024,
//         min: 6
//     },

// })

const express = require("express");
const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    fname : {
     type:String,
     min:8,
     required:true
    },
    lname : {
      type:String,
      min:8,
     },
    password: {
        type:String,
        min:8,
        require:true
       },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    otp:{
      type:Number,
      default:null
    },
    verified:{
      type:Boolean,
      default:false
    }
});

module.exports = mongoose.model('User',userSchema)

// const result = mongoose.model("student" , schema);

// module.exports = result;