const { validationResult } = require("express-validator");
const User = require("../models/User");

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

    if (user.password === password) res.send({ data: user });

    else{
      throw Error(
        JSON.stringify({
          statusCode: 409,
          type: "error",
          msg: "Invalid credentials",
        })
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { userLogin, userSignup };
