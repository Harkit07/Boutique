const Suit = require("../models/suit.js");
const Review = require("../models/review.js");
const { cloudinary } = require("../services/cloudConfig.js");

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

  if (!suit) {
    return res.status(404).json({ message: "Suit not found" });
  }
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

module.exports.getUploadSignature = async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = `BOUTIQUE/${req.user._id}`;

    const paramsToSign = {
      allowed_formats: "jpg,jpeg,png,mp4,mov,webm",
      folder: folder,
      overwrite: false,
      timestamp: timestamp,
      unique_filename: true,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUD_API_SECRET,
    );

    res.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUD_NAME,
      apiKey: process.env.CLOUD_API_KEY,
      folder,
      maxBytes: 50 * 1024 * 1024, // you can still send this to frontend (it's not signed)
      allowedFormats: paramsToSign.allowed_formats,
    });
  } catch (error) {
    console.error("Signature generation error:", error);
    res.status(500).json({ message: "Failed to generate upload signature" });
  }
};

module.exports.createSuitFromMetadata = async (req, res) => {
  const { name, category, description, price, file } = req.body;

  // Security: verify that all uploaded files belong to this user
  const expectedPrefix = `BOUTIQUE/${req.user._id}/`;
  for (const f of file) {
    if (!f.public_id.startsWith(expectedPrefix)) {
      return res.status(403).json({ message: "Unauthorized file usage" });
    }
  }

  const newSuit = new Suit({
    owner: req.user._id,
    name,
    category,
    description,
    price,
    file, // array of { url, public_id, mediaType }
  });

  await newSuit.save();
  res.status(201).json({ message: "Suit created successfully", suit: newSuit });
};
