const express = require("express");
const router = express.Router();
const { upload } = require("../services/cloudConfig.js");
const { body } = require("express-validator");
const authMiddleware = require("../middleware.js");
const suitController = require("../controllers/suit.js");
const wrapAsync = require("../services/wrapAsync.js");
const validationResult = require("../services/validationResult.js");

router.post(
  "/new",
  authMiddleware.authUser,
  upload.array("file", 5),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a number greater than 0"),
  ],
  validationResult,
  wrapAsync(suitController.uploadNewSuit),
);

router.get("/all", wrapAsync(suitController.allSuit));

router.get("/homeReview", wrapAsync(suitController.homeReviews));

router
  .route("/:id")
  .get(wrapAsync(suitController.getSuit))
  .delete(authMiddleware.authUser, wrapAsync(suitController.delSuit));

module.exports = router;
