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
