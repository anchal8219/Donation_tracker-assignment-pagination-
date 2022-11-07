const { signup, login ,pagination} = require('../controllers/userController');

const router = require('express').Router();

router.post('/signup',signup)

router.post('/login', login)

router.get('/paginate', pagination)



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



