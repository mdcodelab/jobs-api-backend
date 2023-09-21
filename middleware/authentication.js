const User = require("../models/User");
const Unauthenticated = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
    //check the header
const authHeader = req.headers.authorization;
if(!authHeader || !authHeader.startsWith("Bearer ")) {
throw new Unauthenticated("Authentication invalid")
}
const token = authHeader.split(" ")[1];

try {
    const payload=jwt.verify(token, process.env.JWT_secret);
    //attach the user to the job routes
    req.user={userId: payload.userId, name: payload.name} //make the data on the user available on all routes
    next();
} catch (error) {
    throw new Unauthenticated("Authentication invalid")
}
}

module.exports=auth;

//testing: get the token from "/api/v1/auth/register" and
// get the "name" & "id" for the user at "/api/v1/jobs"


