const Suit = require("../models/suit.js");
const Review = require("../models/review.js");

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

  res.status(201).json({ message: "Review created successfully" });
};

module.exports.delSuitReview = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
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

  if (!suit.review.includes(reviewId)) {
    return res
      .status(400)
      .json({ message: "Review does not belong to this suit" });
  }

  await Suit.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ message: "Review deleted successfully" });
};
