const dotenv=require('dotenv')
const express=require('express')
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose= require('mongoose')

const app=express();

//import routes
const authRoute = require('./routes/auth');
// const donRoute = require('./routes/donatorDetails') ;

dotenv.config();
const PORT=process.env.PORT || 3000;

app.use(express.static('public'));

//connection 

// mongoose.connect(process.env.DB_URI,()=>{
//     console.log('connected')
// })


//      or
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('err');
  });


//  or 
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DB_URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     ()=>{
//         console.log('connected')
//     },
//     (error)=>{
//         console.log('not connected'+ error)
//     }
// )    
    

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//routes middleware
app.use('/api/user',authRoute);


app.set("view engine", "ejs")

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})
