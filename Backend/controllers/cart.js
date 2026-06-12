const Suit = require("../models/suit.js");
const User = require("../models/user.js");

module.exports.getUserCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.suit");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res
    .status(200)
    .json({ message: "Cart fetched successfully", cart: user.cart });
};

module.exports.addToCart = async (req, res) => {
  const { suitId } = req.params;

  // check suit
  const suit = await Suit.findById(suitId);
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
    user.cart.push({ suit: suitId, quantity: 1 });
  }

  await user.save();

  await user.populate("cart.suit");

  res.status(200).json({
    message: "Added to cart successfully",
    user,
  });
};

module.exports.removeFromCart = async (req, res) => {
  const { suitId } = req.params; // suit id

  // 1. Get the user
  const user = await User.findById(req.user._id);

  // 2. Check if the item exists
  const cartItem = user.cart.find((item) => item.suit.toString() === suitId);
  if (!cartItem) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  // 3. Remove item completely
  user.cart = user.cart.filter((item) => item.suit.toString() !== suitId);

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
  const { suitId } = req.params; // user id

  const user = await User.findById(req.user._id);

  const cartItem = user.cart.find((item) => item.suit.toString() === suitId);

  if (!cartItem) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  cartItem.quantity -= 1;

  // remove item if quantity reaches 0
  if (cartItem.quantity <= 0) {
    user.cart = user.cart.filter((item) => item.suit.toString() !== suitId);
  }

  await user.save();

  await user.populate("cart.suit");

  res.status(200).json({
    message: "Cart updated",
    user,
  });
};
