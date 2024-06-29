const express = require('express');
const router = express.Router();

const { login, signup, sendOTP, changePassword } = require('../controller/Auth');

const { resetPassword, resetPasswordToken } = require('../controller/ResetPassword');

const {auth} = require('../middleware/auth');

//Routes for Login , Sign Up and Authentication
//********************************************************************************************
//                               Authenication Routes
//********************************************************************************************

//Route for user login
router.post("/login",login);

//Route for user signup
router.post("/signup",signup);

//Route for sending otp to the user email
router.post("/sendotp",sendOTP);

//Route for changing password
// router.post("changepassword",auth,changePassword);

//******************************************************************************** */
//                         Reset Password
//******************************************************************************** */

//Route for generating reset-password-token
router.post("/reset-password-token",resetPasswordToken);

//Route for resetting user's password afer verification
router.post("/reset-password", resetPassword);

//export the router for the use in main application
module.exports = router;