const express = require("express");
const router = express.Router({ mergeParams: true });
const { body } = require("express-validator");
const authMiddleware = require("../middleware.js");
const reviewController = require("../controllers/review.js");
const wrapAsync = require("../services/wrapAsync.js");
const validationResult = require("../services/validationResult.js");

router.post(
  "/review",
  authMiddleware.authUser,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5"),
    body("about").notEmpty().withMessage("Review text cannot be empty"),
  ],
  validationResult,
  wrapAsync(reviewController.suitReview),
);

router.delete(
  "/review/:revId",
  authMiddleware.authUser,
  wrapAsync(reviewController.delSuitReview),
);

router
  .route("/cart")
  .post(authMiddleware.authUser, wrapAsync(reviewController.addToCart))
  .delete(authMiddleware.authUser, wrapAsync(reviewController.removeFromCart));

router.delete(
  "/cartitem",
  authMiddleware.authUser,
  wrapAsync(reviewController.decCartCount),
);

module.exports = router;
