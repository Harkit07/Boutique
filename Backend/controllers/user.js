const User = require("../models/user.js");
const userService = require("../services/user.js");
const BlacklistToken = require("../models/blacklistToken.js");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports.signupUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Check if user already exists
  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  // Hash password
  const hashedPassword = await User.hashPassword(password);

  // Create user
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname || "",
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  // Send token in cookie (optional)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user including password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = user.generateAuthToken();

  // Set secure cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({ token, user });
};

module.exports.logoutUser = async (req, res) => {
  // Get token from cookie or authorization header
  const token =
    req.cookies?.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  // Clear cookie (same options as when set)
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  // Add token to blacklist if it exists
  if (token) {
    await BlacklistToken.create({ token });
  }

  res.status(200).json({ message: "Logged out" });
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate 6 digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Hash OTP
  const hashedOTP = await bcrypt.hash(otp, 10);

  user.resetOTP = hashedOTP;
  user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min
  await user.save();

  // Send Mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  res.status(201).json({ message: "OTP sent to email" });
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check OTP expiry
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(String(otp), user.resetOTP);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear OTP
    user.resetOTP = undefined;
    user.otpExpire = undefined;

    await user.save();

    // Generate new token
    const token = user.generateAuthToken();

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "Password reset successful", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
