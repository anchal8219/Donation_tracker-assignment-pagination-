// const student = require("../model/logSchema");
// const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const SECRET_KEY = "DONATIONAPI";
// var Emailvalidator = require("email-validator");
// require('dotenv').config()
// const nodemailer=require("nodemailer");
// const otpGenerator = require('otp-generator')

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'anchaljaiswal1341@gmail.com',
//     pass: process.env.EMAILPASSWORD
//   }
// });




// const result={
// post: async (req,res)=>{ 
//     console.log(req.body);
//     let {fname , lname ,password , email}= req.body;
//     var hashedpassword;
//     if(fname && lname && password && email){
//         const salt= parseInt(process.env.SALT);
//         hashedpassword = await bcrypt.hash(password, salt);
//         email=email.toLowerCase();  
//         try {

//           if(Emailvalidator.validate(email)){
//               if(await result.studentexist(email)){
//                 res.json({success:false,
//                 msg:"user already exists"}); 
//               }else{

//                 const user= new student({
//                   fname:fname,
//                   lname:lname,
//                   password:hashedpassword,
//                   email:email
//                 });

//                   await user.save().then((user)=>{
//                     res.status(200).json({
//                       success:true,
//                       msg:"User Recorded Successfully"
//                     });
//                     // res.redirect("signup/verifyotp/"+email);

//                   }).catch((err)=>{

//                     res.status(400).json({
//                       success:false,
//                       error:err,
//                       msg:"User not been recorded"
//                     });

//                   });
//             }
  
//         }else{
//           res.json({
//               success:false,
//               msg:"Invalid Email Format"
//             });

//         }
          
//         } catch (error) {
//           console.log("error:"+error);
//       }
  
//     }else{
//         res.json({
//         success:false,
//         msg:"One of the field Found Missing"
//       });
//     }
  
//   },
//   get:(req,res)=>{
//     res.json({
//             status:200,
//             msg:"ready to signup"
//           });

//     // res.sendFile(path+"/public/signup.html");
//   },

//   verifyotp : async (req,res)=>{
//     let email=req.params['email'];
//     let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});

//     if(Emailvalidator.validate(email)){
//       if(await result.studentexist(email)){
//         var u = await student.findOne({email : email});
//         if(u.verified == true){
//           res.json({
//             success:false,
//             msg:"user already verified"
//           });
//         }else{
//           try{
//             const sa = await student.findOneAndUpdate({email:email},{otp:otp});

//             var mailOptions = {
//                         from: 'anchaljaiswal1341@gmail.com',
//                         to: email,
//                         subject: 'Verify Email from DAWAY',
//                         html: `
//                     <div
//                       class="container"
//                       style="max-width: 90%; margin: auto; padding-top: 20px"
//                     >
//                       <h2>Welcome to DAWAY.</h2>
//                       <h4>Greatings of the day </h4>
//                       <p style="margin-bottom: 30px;">Please enter the OTP to get started</p>
//                       <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
//                  </div>`
//             };

//             transporter.sendMail(mailOptions, function(error, info){
//                         if (error) {
//                           console.log("not send :"+error);
//                         } else {
//                           console.log('Email sent: ' + info.response);
//                           res.json({success:true,
//                           msg:"OTP send to email"});
//                         }
//             });

//             // res.sendFile(path+"/public/signupotpverification.html");



//           }catch(err){
//             res.json({
//                         success:false,
//                         msg:"Either email invalid or sender email invalid"
//             });

//           }
//         }

//       }else{
//         res.json({
//           success:false,
//           msg:"Email does not exist"
//         });
//       }
//     }else{
//       res.json({
//         success:false,
//         msg:"Invalid Email Format"
//       });
//     }
    

//   },
//   studentexist: async (email)=>{
//     var u = await student.find({email : email});
//     if(u.length!=0){
//       console.log("user found\n");
//       return true;
//     }
//     else{
//       console.log("user not found\n");
//       return false; 
//     }

//   },
//   checkotp:async (req,res)=>{
//     const {otp}=req.body;
//     const email= req.params['email'];

//     if(Emailvalidator.validate(email)){
//       var resu = await student.find({email:email});
//         if(resu.length!=0){
//         if (resu[0].verified == false){
//             if(resu[0].otp == otp){
//               var result = await student.findOneAndUpdate({email:email},{otp:null,verified:true});
//               console.log(result);
//               res.json({
//                 success:true,
//                 token:resu[0]._id,
//                 result:result,
//                 msg:"user verified successfully"
//               });

//             }else{
//               res.json({success:false,
//               msg:"Invalid OTP"});
              
//             }



//           }else{
//               res.json({success:false,
//               msg:"user is already verified"});
              
//             }
//           }else{
//             res.json({success:false,
//             msg:"user doesn't exist"});
//         }


//   }
// }
// };

// module.exports = result;









const userModel = require("../model/logSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "DONATIONAPI";
var Emailvalidator = require("email-validator");
require('dotenv').config()
const nodemailer=require("nodemailer");
const otpGenerator = require('otp-generator')


var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'anchaljaiswal1341@gmail.com',
      pass: process.env.EMAILPASSWORD
    }
  });

const signup = async(req,res)=>{   
    const {fname , lname ,password , email} = req.body;
    try{
        const existEmail = await userModel.findOne({email : email})
        if(existEmail){
            return res.status(400).json({message: "email already exists "})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // const hashedConfirmPassword = await bcrypt.hash(confirm_password, salt);

        const result = await userModel.create({
            fname:fname,
            lname:lname,
            password:hashedPassword,
            email:email
        })

        const token = jwt.sign({email: result.email , id : result._id }, SECRET_KEY)
        res.status(201).json({user: result, token:token});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }


}

const verifyotp = async (req,res)=>{
    let email=req.params['email'];
    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});

    if(Emailvalidator.validate(email)){
      if(await result.studentexist(email)){
        var u = await userModel.findOne({email : email});
        if(u.verified == true){
          res.json({
            success:false,
            msg:"user already verified"
          });
        }else{
          try{
            const sa = await userModel.findOneAndUpdate({email:email},{otp:otp});

            var mailOptions = {
                        from: 'anchaljaiswal1341@gmail.com',
                        to: email,
                        subject: 'Verify Email from DAWAY',
                        html: `
                    <div
                      class="container"
                      style="max-width: 90%; margin: auto; padding-top: 20px"
                    >
                      <h2>Welcome to DAWAY.</h2>
                      <h4>Greatings of the day </h4>
                      <p style="margin-bottom: 30px;">Please enter the OTP to get started</p>
                      <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                 </div>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log("not send :"+error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          res.json({success:true,
                          msg:"OTP send to email"});
                        }
            });

            // res.sendFile(path+"/public/signupotpverification.html");



          }catch(err){
            res.json({
                        success:false,
                        msg:"Either email invalid or sender email invalid"
            });

          }
        }

      }else{
        res.json({
          success:false,
          msg:"Email does not exist"
        });
      }
    }else{
      res.json({
        success:false,
        msg:"Invalid Email Format"
      });
    }
    

  }

const studentexist = async (email)=>{
    var u = await userModel.find({email : email});
    if(u.length!=0){
      console.log("user found\n");
      return true;
    }
    else{
      console.log("user not found\n");
      return false; 
    }

  }
  const checkotp = async (req,res)=>{
    const {otp}=req.body;
    const email= req.params['email'];

    if(Emailvalidator.validate(email)){
      var resu = await userModel.find({email:email});
        if(resu.length!=0){
        if (resu[0].verified == false){
            if(resu[0].otp == otp){
              var result = await userModel.findOneAndUpdate({email:email},{otp:null,verified:true});
              console.log(result);
              res.json({
                success:true,
                token:resu[0]._id,
                result:result,
                msg:"user verified successfully"
              });

            }else{
              res.json({success:false,
              msg:"Invalid OTP"});
              
            }



          }else{
              res.json({success:false,
              msg:"user is already verified"});
              
            }
          }else{
            res.json({success:false,
            msg:"user doesn't exist"});
        }


  }
}







module.exports = {signup, verifyotp, studentexist, checkotp}