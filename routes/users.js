const express = require("express");
const router = express.Router();
require('dotenv').config();
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const {getAllUsers, getUserById,updateUser,deleteUser} = require("../controllers/userController");

// /api/user
router.route('/')
    .get(verifyTokenAndAdmin,getAllUsers);
// /api/user/:id
router.route('/:id')
    .get(verifyTokenAndAuthorization,getUserById)
    .put(verifyTokenAndAuthorization, updateUser)
    .delete(verifyTokenAndAuthorization,deleteUser);

module.exports = router;