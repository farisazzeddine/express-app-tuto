const asyncHandler = require("express-async-handler");
const {validateRegisterUser, User, validateLoginUser} = require("../models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config();
/**
 *
 * @desc Register NEw User
 * @route /api/auth/register
 * @method POST
 * @access Public
 **/
const register = asyncHandler(
    async (req,res)=>{
        const {error} =validateRegisterUser(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }
        let user =  await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({message:"this user already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        user = new User({
            email: req.body.email,
            userName:req.body.userName,
            password: req.body.password
        });
        const result = await user.save();
        const token = user.generateToken();
        const {password, ...other} = result._doc
        res.status(200).json({...other,token});
    }
);
/**
 *
 * @desc login  User
 * @route /api/auth/login
 * @method POST
 * @access Public
 **/
const login = asyncHandler(
    async (req,res)=>{
        const {error} =validateLoginUser(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }
        let user =  await User.findOne({email:req.body.email})
        if (!user){
            return res.status(400).json({message:"invalid email or password"})
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
        if (!isPasswordMatch){
            return res.status(400).json({message:"invalid email or password"})
        }
        const token = user.generateToken();
        const {password, ...other} = user._doc
        res.status(200).json({...other,token});
    }
)
module.exports = {register,login}