const Suit = require("../models/suit.js");
const Review = require("../models/review.js");

module.exports.uploadNewSuit = async (req, res) => {
  const { category, description, price, name } = req.body;

  // Only admins can upload
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  // Validate body
  if (!name || !category || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least 1 file is required" });
  }

  // Create suit
  const suit = new Suit({
    owner: req.user._id,
    name,
    category,
    description,
    price,
    file: req.files.map((file) => ({
      url: file.path, // Cloudinary secure_url
      public_id: file.filename, // Cloudinary public_id
      mediaType: file.mimetype.startsWith("video") ? "video" : "image",
    })),
  });

  await suit.save();

  res.status(200).json({
    message: "Suit uploaded successfully",
    suit,
  });
};

module.exports.allSuit = async (req, res) => {
  const allSuit = await Suit.find({}).sort({ _id: -1 });

  res.status(200).json({ message: "All Detail getted successful", allSuit });
};

module.exports.getSuit = async (req, res) => {
  const { id } = req.params;
  const suit = await Suit.findById(id).populate({
    path: "review",
    populate: {
      path: "author",
    },
  });
  res.status(200).json({ message: "Suit found successful", suit });
};

module.exports.delSuit = async (req, res) => {
  const { id } = req.params;

  const suit = await Suit.findById(id).populate({
    path: "review",
    populate: { path: "author" },
  });

  if (!suit) {
    return res.status(404).json({ message: "Suit not found" });
  }

  if (
    req.user.role !== "admin" &&
    suit.owner.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this suit" });
  }

  // Delete all reviews related to this suit
  if (suit.review && suit.review.length > 0) {
    const reviewIds = suit.review.map((rev) => rev._id);
    await Review.deleteMany({ _id: { $in: reviewIds } });
  }

  // Delete the suit itself
  await Suit.findByIdAndDelete(id);

  res
    .status(200)
    .json({ message: "Suit and associated reviews deleted successfully" });
};

module.exports.homeReviews = async (req, res) => {
  const homeReviews = await Review.find({ rating: { $gt: 3 } })
    .populate("author")
    .sort({ rating: -1, createdAt: -1 }) // optional: highest rating first
    .limit(5);

  res.status(200).json({
    message: "Top reviews fetched successfully",
    homeReviews,
  });
};
