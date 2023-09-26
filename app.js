require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

const connectDB = require("./db/connectDB");
const authenticateUser = require("./middleware/authentication");
const authRouter = require("./routes/auth.js");
const jobsRouter = require("./routes/jobs.js");

const errorHandlerMiddleware = require("./middleware/error-handler.js");
const notFoundMiddleware = require("./middleware/not-found.js");

app.use(express.json());
app.use(helmet());
app.use(cors());

// Setting up rate limiter
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//routes
//domain/api/v1/auth/login
//domain/api/v1/auth/register
//domain/api/v1/jobs
//domain/api/v1/jobs/:id
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("home page");
});

const port = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  console.log("DB connected");
  app.listen(port, console.log(`server is listening at port ${port}`));
}

start();
