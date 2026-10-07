const mongoose = require("mongoose");
const User = require("./user.js");
const { Schema } = mongoose;

const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
});

const suitSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  file: [fileSchema],
  category: {
    type: String,
    enum: ["AARI Work", "Machine Work", "Handwork", "Punjabi Baby Dress"],
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

suitSchema.post("findOneAndDelete", async (suit) => {
  if (suit) {
    // Remove this suit from all users' carts
    await User.updateMany(
      { "cart.suit": suit._id },
      { $pull: { cart: { suit: suit._id } } },
    );
  }
});

const Suit = mongoose.model("suit", suitSchema);

module.exports = Suit;
