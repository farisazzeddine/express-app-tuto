const express = require('express');
const connectionToDB = require('./config/db');
const logger = require("./middlewares/logger");
const {notFound, errorHandler} = require("./middlewares/errors");
require('dotenv').config()
//Connection To database
connectionToDB();
//init app
const app = express();
//apply middlewares
app.use(express.json())
app.use(logger)
// Routes
app.use("/api/books",require("./routes/books"));
app.use("/api/authors",require("./routes/authors"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);
//Runnig the server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))