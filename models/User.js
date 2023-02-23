
const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const UserSchema=new mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim :true,
        minLength:5,
        maxLength:100,
        unique:true
    },
    userName: {
        type:String,
        required:true,
        trim :true,
        minLength:6
    },
    password: {
        type:String,
        required:true,
        trim :true,
        minLength:5,
        maxLength:100
    },
    isAdmin : {
        type:Boolean,
       default: false,
    }
},{
    timestamps:true
})
//Generate token
UserSchema.methods.generateToken = function (){
    return jwt.sign({
        id:this._id,isAdmin:this.isAdmin},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"4h"
        })
}
const User = mongoose.model("User",UserSchema);
//Validate Register User
function validateRegisterUser(obj){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        userName:Joi.string().min(2).max(200).required(),
        password: Joi.string().min(6).max(200).required(),
    })
    return schema.validate(obj)
}
//Validate Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(6).max(200).required(),
    })
    return schema.validate(obj)
}
//Validate update a User
function validateUpdateUser(obj){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).email(),
        userName:Joi.string().min(2).max(200),
        password: Joi.string().min(6).max(200),
    })
    return schema.validate(obj)
}
module.exports ={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}