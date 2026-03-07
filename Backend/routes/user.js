const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.js");
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
  userController.signupUser,
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
  wrapAsync(userController.loginUser),
);

router.post(
  "/forgotpassword",
  body("email").isEmail().withMessage("Invalid Email"),
  validationResult,
  wrapAsync(userController.forgotPassword),
);

router.post(
  "/resetpassword",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("otp").isLength({ min: 6 }).withMessage("Ente a valid OTP"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain 8 characters"),
  ],
  validationResult,
  wrapAsync(userController.resetPassword),
);

router.post(
  "/updateuser",
  authMiddleware.authUser,
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name contain 3 characters"),
    body("fullname.lastname").optional(),
    body("address").optional(),
    body("city").optional(),
    body("phone").optional().isMobilePhone("any"),
  ],
  validationResult,
  wrapAsync(userController.updateUser),
);

router.get(
  "/profile",
  authMiddleware.authUser,
  wrapAsync(userController.getUserProfile),
);

router.get(
  "/logout",
  authMiddleware.authUser,
  wrapAsync(userController.logoutUser),
);

module.exports = router;
