require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const connectDB=require("./db/connectDB");
const authRouter = require("./routes/auth.js");
const jobsRouter = require("./routes/jobs.js");


const errorHandlerMiddleware = require("./middleware/error-handler.js")
const notFoundMiddleware = require("./middleware/not-found.js");

app.use(express.json());

//routes
//domain/api/v1/auth/login
//domain/api/v1/auth/register
//domain/api/v1/jobs
//domain/api/v1/jobs/:id
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);


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