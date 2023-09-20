const CustomError = require("../errors/custom-errors.js");
const {StatusCodes}=require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    //console.log("error", err);
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.msg})
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message || "Something went wrong!" });


}

module.exports=errorHandlerMiddleware;


