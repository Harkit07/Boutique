const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth.js");
const authMiddleware = require("../middleware.js");
const wrapAsync = require("../services/wrapAsync.js");
const validationResult = require("../services/validationResult.js");

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name contain 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain 6 characters"),
  ],
  validationResult,
  wrapAsync(authController.signupUser),
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain 8 characters"),
  ],
  validationResult,
  wrapAsync(authController.loginUser),
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Invalid Email"),
  validationResult,
  wrapAsync(authController.forgotPassword),
);

router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("otp").isLength({ min: 6 }).withMessage("Ente a valid OTP"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain 8 characters"),
  ],
  validationResult,
  wrapAsync(authController.resetPassword),
);

router.post("/logout", wrapAsync(authController.logoutUser));

module.exports = router;
