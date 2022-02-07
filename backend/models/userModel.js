const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
 

const userSchema = new mongoose.Schema({
    rolse: {
        type:String,
        default: "user",
        },
        
        createdAt:{
            type:Date,
            default: Date.now,
        },
   
    name: {
        type:String,
        require: [true, "plase Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 charecters"],
        minLength: [4, "Name should have more than 4 charecters"]
    },
    email:{
        type:String,
        require:[true, "Place Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Plese Enter a valid Email"]
    },
    password: {
        type:String,
        require: [true, "Please Enter Your Password"],
        minLength: [8, "Name should have more than 4 charecters"],
        select: false,
    },
    avatar: {
            public_id: {
                type: String,
                require:true,
            },
            url:{
                type:String,
                require:true,
            },
            },
  
        
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    
}); 

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next(); 
    }

    this.password = await bcrypt.hash(this.password, 10)
});

//JWT TOKEN

userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//Compare Password

userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
}; 

// Generating Password Reset Token

    userSchema.methods.getResetPasswordToken = function () {
 
    //Generating Token

    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to userSchema 
    
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("user",userSchema);