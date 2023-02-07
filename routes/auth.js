const signup = require('../controllers/signup');
const login = require('../controllers/login');
const forgetpass = require('../controllers/forgetpassword');

const router = require('express').Router();


// signup

router.post('/signup',signup.post);
router.get('/signup',signup.get);
router.get('/signup/verifyotp/:email',signup.verifyotp);
router.post('/signup/verifyotp/:email',signup.checkotp);
// router.post('/signup',signup)
// router.get('/signup/verifyotp',verifyotp);
// router.post('/signup/verifyotp',checkotp);


// router.post('/login', login)

//--admin/login
router.post('/login',login.post);
router.get('/login',login.get);
router.get("/login/forgetpass",forgetpass.get_enteremail);
router.post("/login/forgetpass",forgetpass.post_enteremail);
router.post("/login/forgetpass/verification",forgetpass.post_otp_verification);
router.post("/login/forgetpass/verified",forgetpass.Set_password);

//--admin/dashboard
router.get('/dashboard/:id',dashboard.get);

module.exports = router;





















// // const User = require('../model/logSchema');
// // const jwt =  require('jsonwebtoken');
// // const bcrypt = require('bcrypt');



// // hash the passwords
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(req.body.password,salt);

//     const user = new User({
//         username: req.body.username,
//         password: hashedPassword
//     });
//     user.save();
//     res.send(user);

// //login
// router.post('/login',async(req,res) => {
//     //password is correct
//     const validPass = await bcrypt.compare(req.body.password,user.password);
//     if(!validPass) return res.send('Invalid password');

//     //create and assign a token
//     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

//     res.header('auth-token',token).send(token);
//     //res.send('Logged in!')
// })



