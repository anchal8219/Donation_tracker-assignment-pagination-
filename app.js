const dotenv=require('dotenv')
const express=require('express')
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose= require('mongoose')

const app=express();

//import routes
const authRoute = require('./routes/auth');
const donRoute = require('./routes/donatorDetails') ;

dotenv.config();
const PORT=process.env.PORT || 4000;

app.use(express.static('public'));

mongoose.connect(process.env.DB_URI,()=>{
    console.log('connected')
})

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//routes middleware
app.use('/api/user',authRoute);
app.use('/api/user',donRoute);

app.set("view engine", "ejs")

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})