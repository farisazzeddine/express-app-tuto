
const mongoose = require('mongoose');
const Joi = require("joi");
const AuthorSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim :true,
        minLength:3,
        maxLength:200
    },
    lastName: {
        type:String,
        required:true,
        trim :true,
        minLength:3,
        maxLength:200
    },
    nationality : {
        type:String,
        required:true,
        trim :true,
        minLength:3,
        maxLength:200
    },
    image: {
        type:String,
        default : "default-avatar.png",
        required:true,
        trim :true,
        minLength:3,
        maxLength:200
    },
},{
    timestamps:true
})
const Author = mongoose.model("Author",AuthorSchema);
//Validate Create author
function validateCreateAuthor(obj){
    const schemaCreate = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        nationality : Joi.string().min(3).max(100).required(),
        image: Joi.string().trim().min(3).max(200).required(),
    })
    return schemaCreate.validate(obj)
}
//Validate update a author
function validateUpdateAuthor(obj){
    const schemaUpdate = Joi.object({
        firstName: Joi.string().min(3).max(100),
        lastName: Joi.string().min(3).max(100),
        nationality : Joi.string().min(3).max(100),
        image: Joi.string().trim().min(3).max(200),
    })
    return schemaUpdate.validate(obj)
}
module.exports ={
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}