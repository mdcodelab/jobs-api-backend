//register user
const User=require("../models/User");
const BadRequest=require("../errors/bad-request");
const {StatusCodes}=require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Unauthenticated=require("../errors/unauthenticated");

const register = async (req, res) => {
    //res.send("register user");
    // const {name, email, password}=req.body;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword= await bcrypt.hash(password, salt);
    //const tempUser = {name:name, email:email, password: hashedPassword};
    //console.log(req.body);
    //res.json(req.body);
    // if(!name || !email || !password) {
    //     throw new BadRequest("Please provide name, email and password!");}
    // const user = await User.create({tempUser});
    const user = await User.create({...req.body});
    const token = jwt.sign({ userId: user._id, name: user.name },
         process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });

    res.status(StatusCodes.CREATED).json({user, token});
    }



//login user
const login = async (req, res) => {
    const {email, password}=req.body;
    if(!email || !password) {
        throw new BadRequest("Please provide name and password.")
    }
    //check for the user
    const user = await User.findOne({email});
    if(!user) {
        throw new Unauthenticated("Invalid credentials");
    }
    //check if the password is correct
    const checkPassword = await bcrypt.compare(password, user.password); //boolean

    if(!checkPassword) {
        throw new Unauthenticated("Invalid credentials");
    }

    // User exists and password is correct, so we create the token
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
    res.status(StatusCodes.OK).json({ user, token });
}

module.exports={register, login};
