const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const suitRouter = require("./routes/suit.js");
const reviewRouter = require("./routes/review.js");
const cartRouter = require("./routes/cart.js");

const app = express();
const port = process.env.PORT;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined")); // Apache combined log format
app.use(compression());
app.use(helmet()); // 🛡️ Security headers

// Create a limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window per IP
  skipSuccessfulRequests: true, // Don't count successful requests (optional)
  message: { message: "Too many attempts, please try again later." },
});

// Apply only to the sensitive auth routes
app.use("/auth/forgot-password", authLimiter);
app.use("/auth/reset-password", authLimiter);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/suits", suitRouter);
app.use("/suits/:id/reviews", reviewRouter);
app.use("/cart", cartRouter);

// 404 handler
app.use("/*splat", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
