const express = require("express");

const { loginRequest, signupRequest } = require("../validators/userValidations");
const { userLogin, userSignup } = require("../controllers/userController");

const router = express();

router.post("/login", loginRequest(), userLogin);
router.post("/signup", signupRequest(), userSignup)

module.exports = router;
