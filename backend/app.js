const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");

//config

if(process.env.NODE_ENV !=="PRODUCTION"){
   require("dotenv").config({path:"backend/config/config.env"});
}


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Router Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const path = require("path");

app.use("/app/vi",product); 
app.use("/app/vi",user);    
app.use("/app/vi",order);
app.use("/app/vi",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));  
})
 
//Middleware for Errors

app.use(errorMiddleware);
 
module.exports = app;
 