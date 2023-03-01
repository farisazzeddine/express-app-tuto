const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const {getAllBooks,getBookById,createBook, updateBook, deleteBook} = require("../controllers/bookController");

// /api/author
router.route('/')
    .get(getAllBooks)
    .post(verifyTokenAndAdmin,createBook);
// /api/author/:id
router.route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin,deleteBook);


module.exports = router;