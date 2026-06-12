const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middleware.js");
const cartController = require("../controllers/cart.js");
const wrapAsync = require("../services/wrapAsync.js");

router.get("/", authMiddleware.authUser, wrapAsync(cartController.getUserCart));

router
  .route("/items/:suitId")
  .post(authMiddleware.authUser, wrapAsync(cartController.addToCart))
  .delete(authMiddleware.authUser, wrapAsync(cartController.removeFromCart));

router.post(
  "/items/:suitId/decrement",
  authMiddleware.authUser,
  wrapAsync(cartController.decCartCount),
);

module.exports = router;
