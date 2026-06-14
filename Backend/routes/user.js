const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.js");
const authMiddleware = require("../middleware.js");
const wrapAsync = require("../services/wrapAsync.js");
const validationResult = require("../services/validationResult.js");

router
  .route("/me")
  .get(authMiddleware.authUser, wrapAsync(userController.getUserProfile))
  .patch(
    authMiddleware.authUser,
    [
      body("fullname.firstname")
        .isLength({ min: 3 })
        .withMessage("First name contain 3 characters"),
      body("fullname.lastname").optional(),
      body("address").optional(),
      body("city").optional(),
      body("phone")
        .optional()
        .isNumeric()
        .withMessage("Phone must contain only digits"),
    ],
    validationResult,
    wrapAsync(userController.updateUser),
  );

module.exports = router;
