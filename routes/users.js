const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const bcrypt = require('bcryptjs');
const {  User, validateUpdateUser}  = require('../models/User')
require('dotenv').config();

const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken')

/**
 * @desc Get all User
 * @route /api/users
 * @method GET
 * @access private (only admin)
 **/
router.get("/",verifyTokenAndAdmin,asyncHandler(
    async (req,res)=>{
        const userList = await User.find().select("-password");
        // const {password, ...other} = userList._doc
        // res.status(200).json({...other});
        res.status(200).json(userList);
    }
));
/**
 * @desc Get  user by id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 **/
router.get("/:id",verifyTokenAndAuthorization,
    asyncHandler(
        async (req,res)=>{
            const user = await User.findById(req.params.id);
            if (user){
                const {password, ...other} = user._doc
                res.status(200).json({...other});
            } else{
                res.status(404).json({message:"user not found"});
            }

        }
    )
);
/**
 * @desc update a user
 * @route /api/users/:id
 * @method PUT
 * @access private
 *
 **/
router.put("/:id",verifyTokenAndAuthorization,
    asyncHandler(
        async  (req,res)=> {
            const {error} =validateUpdateUser(req.body)
            if (error){
                return res.status(400).json({message : error.details[0].message})
            }
            if (req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
            const updateUser =  await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    email: req.body.email,
                    userName:req.body.userName,
                    password: req.body.password
                }
            },{new:true}).select("-password");
            if (updateUser){
                res.status(200).json(updateUser);
            }else{
                res.status(404).json({message:"user not found"});
            }

        }
    )
);
/**
 * @desc delete  user by id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 **/
router.delete("/:id",verifyTokenAndAuthorization,
    asyncHandler(
        async (req,res)=>{
            const user = await User.findById(req.params.id);
            if (user){
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({message:'user has been deleted successfuly'});
            } else{
                res.status(404).json({message:"user not found"});
            }

        }
    )
);
module.exports = router;