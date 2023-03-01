const asyncHandler = require("express-async-handler");
const {Book, validateCreateBook, validateUpdateBook} = require("../models/Book");

/**
 *
 * @desc Get all Books
 * @route /api/books
 * @method GET
 * @access Public
 *  comparison Query Operators
 *  $eq equal
 *  $ne (not equal)
 *  $lt (less than)
 *  $lte (less than and equal)
 *  $gt (greater than and equal)
 *  $gt (greater than )
 *  $gte (greater than and equal)
 *  $in (in value ) $in :[7, 12]
 *  $nin (not in value ) $nin :[7, 12]
 **/
const getAllBooks = asyncHandler(
    async (req,res)=>{
        const {minPrice,maxPrice}=req.query;
        let BookList;
        if(minPrice && maxPrice){
            BookList = await Book.find({price:{$gte :minPrice,$lte:maxPrice}}).populate('author',["_id","firstName","lastName"])
        }
        else{
            BookList = await Book.find().populate('author',["_id","firstName","lastName"])
        }
        // const BookList = await Book.find().sort({title :  1}).select("title description")
        res.status(200).json({"count":BookList.length,BookList});
    }
)
/**
 *
 * @desc Get  Book by id
 * @route /api/books/:id
 * @method GET
 * @access Public
 *
 **/
const getBookById = asyncHandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id).populate('author',["_id","firstName","lastName"]);
        if (book){
            res.status(200).json(book);
        } else{
            res.status(404).json({message:"book not found"});
        }

    }
)
/**
 *
 * @desc create Book
 * @route /api/books
 * @method POST
 * @access Private (only admin)
 *
 **/
const createBook =  asyncHandler(
    async (req,res)=>{

        const {error} =validateCreateBook(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }
        const bookInsert = new Book({
            price: req.body.price,
            rating:req.body.rating,
            title: req.body.title,
            description : req.body.description,
            author: req.body.author,
            reviews: req.body.reviews,
            image: req.body.image,
            printLength: req.body.printLength,
            language: req.body.language,
            PublicationDate: req.body.PublicationDate,
            inStock: req.body.inStock,
        });
        const result = await bookInsert.save();
        res.status(201).json(result);
    }
);
/**
 *
 * @desc update a Book
 * @route /api/books/:id
 * @method PUT
 * @access Private (only admin)
 *
 **/
const updateBook = asyncHandler(
    async  (req,res)=>{
        const {error} = validateUpdateBook(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }
        const updateBook = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                price: req.body.price,
                rating:req.body.rating,
                title: req.body.title,
                description : req.body.description,
                author: req.body.author,
                reviews: req.body.reviews,
                image: req.body.image,
                printLength: req.body.printLength,
                language: req.body.language,
                PublicationDate: req.body.PublicationDate,
                inStock: req.body.inStock,
            }
        },{new:true});
        if (updateBook){
            res.status(200).json(updateBook);
        } else{
            res.status(404).json({message:"book not found"});
        }


    }
)
/**
 *
 * @desc delete a Book
 * @route /api/books/:id
 * @method DELETE
 * @access Private (only admin)
 *
 **/
const deleteBook = asyncHandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id);
        if (book){
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({message : 'book has been deleted'});
        } else{
            res.status(404).json({message:"book not found"});
        }

    }
)
module.exports = {getAllBooks,getBookById,createBook,updateBook,deleteBook};