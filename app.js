const express = require('express');
const connectionToDB = require('./config/db');
const logger = require("./middlewares/logger");
const {notFound, errorHandler} = require("./middlewares/errors");
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()
//Connection To database
connectionToDB();
//init app
const app = express();
//Static Folder
app.use(express.static(path.join(__dirname,"images")))
//apply middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(logger)
//Helmet
app.use(helmet())
//Cors Policy
app.use(cors({
 //all we can get this app services
    origin : "*",
//all just this address we can get this app service
//     origin : "http://localhost:5000"
}))
//set view Engine
app.set('view engine','ejs');
// Routes
app.use("/api/books",require("./routes/books"));
app.use("/api/authors",require("./routes/authors"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
app.use("/api/upload",require("./routes/upload"));
app.use("/password",require("./routes/password"));
// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);
//Runnig the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))