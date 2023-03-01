const express = require('express');
const router = express.Router();
const multer =  require('multer');
const path = require('path');
const {v1: uuidv1, v4: uuidv4,} = require('uuid');
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename:function (req,file,cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        // cb(null,`${uuidv4()}-${file.originalname}`);
        cb(null,`${uuidv4()}${ext}`);
    }
})
const upload = multer({storage})
// /api/upload
router.post('/',upload.single('image'),(req,res)=>{
    res.status(200).json({message:"image uploaded"})
})
module.exports = router;