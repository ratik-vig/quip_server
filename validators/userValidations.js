const { body } = require("express-validator");

const loginRequest = () => {
  return [
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("not a valid email address"),
    body("password").notEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
  ];
};

const signupRequest = () => {
  return [
    body("name").not().isEmpty().withMessage("name is required"),
    body("name")
      .isLength({ min: 2 })
      .withMessage("name must have 2 characters"),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("not a valid email address"),
    body("password").notEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
  ];
};

module.exports = { loginRequest, signupRequest };
