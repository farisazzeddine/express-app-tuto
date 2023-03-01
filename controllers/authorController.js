const asyncHandler = require("express-async-handler");
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Author");

/**
 *
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access Public
 **/
const getAllAuthors= asyncHandler(
    async (req,res)=>{
        const {pageNumber} = req.query;
        const authorsPerPage = 2
        const authorList = await Author.find()
            .skip((pageNumber - 1) * authorsPerPage)
            .limit(authorsPerPage);
        // const authorList = await Author.find().sort({firstName :  1}).select("firstName lastName")
        res.status(200).json({"count":authorList.length,authorList});
    }
)
/**
 *
 * @desc Get  author by id
 * @route /api/authors/:id
 * @method GET
 * @access Public
 *
 **/
const getAuthorById = asyncHandler(
    async (req,res)=>{
        const author = await Author.findById(req.params.id);
        if (author){
            res.status(200).json(author);
        } else{
            res.status(404).json({message:"author not found"});
        }

    }
);
/**
 *
 * @desc create author
 * @route /api/authors
 * @method POST
 * @access Private (only admin)
 *
 **/
const createAuthor = asyncHandler(
    async (req,res)=>{
        const {error} =validateCreateAuthor(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }

        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality : req.body.nationality,
            image: req.body.image,
        })
        const result = await author.save();
        res.status(201).json(result);
    }
)
/**
 *
 * @desc update a author
 * @route /api/authors/:id
 * @method PUT
 * @access Private (only admin)
 *
 **/
const updateAuthor = asyncHandler(
    async  (req,res)=>{
        const {error} = validateUpdateAuthor(req.body)
        if (error){
            return res.status(400).json({message : error.details[0].message})
        }
        const author = await Author.findByIdAndUpdate(req.params.id,{
            $set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality : req.body.nationality,
                image: req.body.image,
            }
        },{new:true});
        if (author){
            res.status(200).json(author);
        } else{
            res.status(404).json({message:"author not found"});
        }


    }
)
/**
 *
 * @desc delete a author
 * @route /api/authors/:id
 * @method DELETE
 * @access Private (only admin)
 *
 **/
const deleteAuthor = asyncHandler(
    async (req,res)=>{

        const author = await Author.findById(req.params.id);
        if (author){
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({message : 'author has been deleted'});
        } else{
            res.status(404).json({message:"author not found"});
        }

    }
)
module.exports = {getAllAuthors,getAuthorById,createAuthor,updateAuthor,deleteAuthor}