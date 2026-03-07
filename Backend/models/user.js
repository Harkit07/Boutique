const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must contain 4 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must contain 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must contain 5 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  resetOTP: {
    type: String,
  },
  otpExpire: Date,
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: Number,
  },
  cart: {
    type: [
      {
        suit: {
          type: Schema.Types.ObjectId,
          ref: "suit",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [], // 👈 THIS fixes your issue
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
