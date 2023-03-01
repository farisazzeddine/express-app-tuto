const express = require('express');
const router = express.Router()
const {getForgetPasswordView,sendForgetPasswordLink,getResetPasswordView,sendResetPassword } = require("../controllers/passwordController");

//password/forgot-password
router.route("/forgot-password")
        .get(getForgetPasswordView)
        .post(sendForgetPasswordLink);
//password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
        .get(getResetPasswordView)
        .post(sendResetPassword);

module.exports = router