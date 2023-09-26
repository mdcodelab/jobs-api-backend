const CustomError = require("../errors/custom-errors.js");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  // Set default error values
  let customError = {
    //set as  default
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something goes wrong, try again later.",
  };

  if (err instanceof CustomError) {
    customError.msg = err.msg;
    customError.statusCode = err.statusCode;
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
