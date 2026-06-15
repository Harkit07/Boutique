const express = require("express");
const router = express.Router();
const { upload } = require("../services/cloudConfig.js");
const { body } = require("express-validator");
const authMiddleware = require("../middleware.js");
const suitController = require("../controllers/suit.js");
const wrapAsync = require("../services/wrapAsync.js");
const validationResult = require("../services/validationResult.js");

// ========== Static routes ==========

router.get("/", wrapAsync(suitController.allSuit));

router.get("/featured-reviews", wrapAsync(suitController.homeReviews));

router
  .route("/upload")
  .get(authMiddleware.authUser, wrapAsync(suitController.getUploadSignature))
  .post(
    authMiddleware.authUser,
    [
      body("name").notEmpty(),
      body("category").notEmpty(),
      body("description").notEmpty(),
      body("price").isFloat({ gt: 0 }),
      body("file").isArray({ min: 1 }),
    ],
    validationResult,
    wrapAsync(suitController.createSuitFromMetadata),
  );

// ========== Dynamic route (must be last) ==========
router
  .route("/:id")
  .get(wrapAsync(suitController.getSuit))
  .delete(authMiddleware.authUser, wrapAsync(suitController.delSuit));

module.exports = router;
