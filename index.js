const path = require("path") ; 
const express = require("express") ; 
const ejs = require('ejs');
const mongoose = require('mongoose') ; 

const app = express() ; 
const PORT = 8000 ; 

mongoose.connect('mongodb://localhost:27017/blogify')
.then(e => console.log('MongoDB Connected'));

const userRoute = require('./routes/user') ; 
app.use(express.urlencoded({ extended: true }));

app.set('view engine' , 'ejs') ; 
app.set('views' , path.resolve("./views"))  ;

app.get('/' , (req , res) =>{
  res.render('home') ; 
})

app.use('/user' , userRoute); 


app.listen(PORT , () => console.log(`Server started at port: ${PORT}`))
