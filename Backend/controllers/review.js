const Suit = require("../models/suit.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

module.exports.suitReview = async (req, res) => {
  const { id } = req.params;
  const { about, rating } = req.body;

  const suit = await Suit.findById(id);
  if (!suit) {
    return res.status(404).json({ message: "Suit not found" });
  }

  const newReview = new Review({ author: req.user._id, about, rating });
  await newReview.save();

  suit.review.push(newReview._id);
  await suit.save();

  res.status(201).json({ message: "Review created successful" });
};

module.exports.delSuitReview = async (req, res) => {
  const { id, revId } = req.params;
  const review = await Review.findById(revId);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  const isAuthor = review.author.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isAuthor && !isAdmin) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this review" });
  }

  const suit = await Suit.findById(id);
  if (!suit) {
    return res.status(404).json({ message: "Suit not found" });
  }

  if (!suit.review.includes(revId)) {
    return res
      .status(400)
      .json({ message: "Review does not belong to this suit" });
  }

  await Suit.findByIdAndUpdate(id, {
    $pull: { review: revId },
  });

  await Review.findByIdAndDelete(revId);

  res.status(200).json({ message: "Review Deleted successful" });
};

module.exports.addToCart = async (req, res) => {
  const { id } = req.params;

  // check suit
  const suit = await Suit.findById(id);
  if (!suit) {
    return res.status(404).json({ message: "Suit not found" });
  }

  // get user
  const user = await User.findById(req.user._id);

  // find suit in cart
  const cartItem = user.cart.find(
    (item) => item.suit.toString() === suit._id.toString(),
  );

  if (cartItem) {
    // suit already in cart → increase quantity
    cartItem.quantity += 1;
  } else {
    // add new suit to cart
    user.cart.push({ suit: id, quantity: 1 });
  }

  await user.save();

  await user.populate("cart.suit");

  res.status(200).json({
    message: "Added to cart successfully",
    user,
  });
};

module.exports.removeFromCart = async (req, res) => {
  const { id } = req.params; // suit id

  // 1. Get the user
  const user = await User.findById(req.user._id);

  // 2. Check if the item exists
  const cartItem = user.cart.find((item) => item.suit.toString() === id);
  if (!cartItem) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  // 3. Remove item completely
  user.cart = user.cart.filter((item) => item.suit.toString() !== id);

  // 4. Save changes
  await user.save();

  await user.populate("cart.suit");

  // 5. Send response
  res.status(200).json({
    message: "Item removed from cart",
    user,
  });
};

module.exports.decCartCount = async (req, res) => {
  const { id } = req.params; // user id

  const user = await User.findById(req.user._id);

  const cartItem = user.cart.find((item) => item.suit.toString() === id);

  if (!cartItem) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  cartItem.quantity -= 1;

  // remove item if quantity reaches 0
  if (cartItem.quantity <= 0) {
    user.cart = user.cart.filter((item) => item.suit.toString() !== id);
  }

  await user.save();

  await user.populate("cart.suit");

  res.status(200).json({
    message: "Cart updated",
    user,
  });
};
