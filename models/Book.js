
const mongoose = require('mongoose');
const Joi = require("joi");
const BookSchema=new mongoose.Schema({
    price: {
        type:Number,
        required:true,
        trim :true,
        min:0
    },
    rating: {
        type:Number,
        required:true,
        trim :true,
        minLength:3,
        maxLength:50
    },
    printLength: {
        type:Number,
        required:true,
        trim :true,
        minLength:3,
        maxLength:50
    },
    reviews: {
        type:Number,
        required:true,
        trim :true,
        minLength:3,
        maxLength:150
    },
    title: {
        type:String,
        required:true,
        trim :true,
        minLength:3,
        maxLength:100
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description: {
        type:String,
        required:true,
        trim :true,
        minLength:3,
    },
    language : {
        type:String,
        required:true,
        trim :true,
        minLength:3,
        maxLength:100
    },
    image: {
        type:String,
        default : "default-book.png",
        required:true,
        trim :true,
        minLength:3,
        maxLength:200
    },
    PublicationDate: {
        type:Date,
        default: Date.now,
        required:true,
    },
    inStock: {
        type:Boolean,
        required:true,
    },
},{
    timestamps:true
})
const Book = mongoose.model("Book",BookSchema);
//Validate Create book
function validateCreateBook(obj){
    const schema = Joi.object({
        price: Joi.number().min(0).required(),
        rating:Joi.number().min(0).required(),
        title: Joi.string().min(3).max(100).required(),
        description : Joi.string().min(5).required(),
        author: Joi.string().min(3).max(500).required(),
        reviews:Joi.number().min(0).required(),
        image: Joi.string().trim().min(3).max(200).required(),
        printLength: Joi.number().min(0).required(),
        language: Joi.string().min(3).max(50).required(),
        PublicationDate: Joi.date().required(),
        inStock: Joi.bool().required(),
    })
    return schema.validate(obj)
}
//Validate update a book
function validateUpdateBook(obj){
    const schema = Joi.object({
        price: Joi.number().min(0),
        rating:Joi.number().min(0),
        title: Joi.string().min(3).max(100),
        description : Joi.string().min(5),
        author: Joi.string().min(3).max(500),
        reviews:Joi.number().min(0),
        image: Joi.string().trim().min(3).max(200),
        printLength: Joi.number().min(0),
        language: Joi.string().min(3).max(50),
        PublicationDate: Joi.date(),
        inStock: Joi.bool(),
    })
    return schema.validate(obj)
}
module.exports ={
    Book,
    validateCreateBook,
    validateUpdateBook
}