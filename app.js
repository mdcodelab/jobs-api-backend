require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const connectDB=require("./db/connectDB");


const errorHandlerMiddleware = require("./middleware/error-handler.js")
const notFoundMiddleware = require("./middleware/not-found.js");

app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.get("/", (req, res)=> {
    res.send("home page")
})

const port=5000;

const start = async = () => {
    try {
        app.listen(port, () => {
            //connectDB(process.env.MONGO_URI);
            //connectDB(process.env.JWT.SECRET);
          console.log(`server is listening at port ${port}`);
        });
    } catch (error) {
        console.log(error); 
    }
}

start();