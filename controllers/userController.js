const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const {hashPassword, checkPassword} = require('../utils/passwordHash')

const userSignup = async(req, res, next) => {
  const valResult = validationResult(req).array({ onlyFirstError: true })
  try{
    if (!valResult.length == 0) {
      throw Error(
        JSON.stringify({
          statusCode: 400,
          type: "validation",
          msg: valResult,
        })
      );
    }

    const {name, email, password} = req.body
    const user = await User.findOne({email})

    if(user){
      throw Error(
        JSON.stringify({
          statusCode: 409,
          type: "error",
          msg: "User already exists",
        })
      );
    }
    const hashedPassword = hashPassword(password)
    const addedUser = await User.create({name, email, password: hashedPassword})
    res.status(201).send(addedUser)

  }catch(err){
    next(err)
  }
}

const userLogin = async (req, res, next) => {
  const valResult = validationResult(req).array({ onlyFirstError: true });
  try {
    if (!valResult.length == 0) {
      throw Error(
        JSON.stringify({
          statusCode: 400,
          type: "validation",
          msg: valResult,
        })
      );
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw Error(
        JSON.stringify({
          statusCode: 404,
          type: "error",
          msg: "User does not exist",
        })
      );
    }

    if (checkPassword(user.password, password)) {
      const token = await jwt.sign({data: user}, process.env.JWT_SECRET)
      res.send({ userId: user._id, name: user.name, email: user.email, password: user.password, token })
    } else{
      throw Error(
        JSON.stringify({
          statusCode: 401,
          type: "error",
          msg: "Invalid credentials",
        })
      );
    }
  } catch (err) {
    console.log(err)
    next(err);
  }
};

module.exports = { userLogin, userSignup };
