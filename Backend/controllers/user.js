const User = require("../models/user.js");
const userService = require("../services/user.js");
const BlacklistToken = require("../models/blacklistToken.js");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports.getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = await User.findById(req.user._id).populate("cart.suit");

  res.status(200).json({
    message: "User profile fetched successfully",
    user: user,
  });
};

module.exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, address, city, phone } = req.body;
  const userId = req.user.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "fullname.firstname": fullname.firstname,
          "fullname.lastname": fullname.lastname,
          address: address,
          city: city,
          phone: phone,
        },
      },
      { new: true },
    );
    res.status(200).json({
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
