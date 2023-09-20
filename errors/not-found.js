const  CustomError  = require("./custom-errors");
const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomError {
  constructor() {
    super(message)
    this.statusCode=StatusCodes.NOT_FOUND;
  }  
}

module.exports=NotFound;