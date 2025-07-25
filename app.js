const path = require("path") ; 
const express = require("express") ; 
const ejs = require('ejs');
const mongoose = require('mongoose') ;
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/user') ; 
const { checkForAuthenticationCookie, validateToken } = require("./middleware/authentication");
const blogRoute = require('./routes/blog');
const dotenv = require('dotenv');
dotenv.config();


const app = express() ; 
const PORT = process.env.PORT ||  8000 ; 

mongoose.connect(process.env.MONGO_URL)
.then(e => console.log('MongoDB Connected'));
app.use(cookieParser()) ; 

app.use(checkForAuthenticationCookie("token")) ; 

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.user = req.user || null;  
  next();
});

app.set('view engine' , 'ejs') ; 
app.set('views' , path.resolve("./views"))  ;

app.get('/dashboard', validateToken, (req, res) => {
  res.render('dashboard');
});

app.get('/' , (req , res) =>{
  res.render('home' , {
    user : req.user , 
  }) ; 
})

app.use('/user' , userRoute); 
app.use('/blog', blogRoute);


app.listen(PORT , () => console.log(`Server started at port: ${PORT}`))
