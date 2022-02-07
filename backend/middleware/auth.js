const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken"); 
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors ( async (req, res, next)=>{

const { token } = req.cookies;

if(!token){
    return next(new ErrorHander("Please Login to access this resource",401)); 
}

const decodeData = jwt.verify(token,process.env.JWT_SECRET);
req.user = await User.findById(decodeData.id);
next();

});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) =>{
     if(!roles.includes(req.user.rolse)){
        return next(new ErrorHander(`Role: ${req.user.rolse} is not allowed to access this resouce`,
        403
        ) 
        );
     }
     next();
    };
};