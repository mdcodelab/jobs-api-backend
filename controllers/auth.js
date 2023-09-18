//register user
const User=require("../models/User");
const BadRequest=require("../errors/bad-request");
const {StatusCodes}=require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    //res.send("register user");
    const {name, email, password}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt)

    const tempUser = {name:name, email:email, password: hashedPassword};


    //console.log(req.body);
    //res.json(req.body);
    if(!name || !email || !password) {
        throw new BadRequest("Please provide name, email and password!");
    }
    const user = await User.create({...tempUser});
    res.status(StatusCodes.CREATED).json({user});
    }



//login user
const login = async (req, res) => {
    res.send("login user");
}

module.exports = {register, login};