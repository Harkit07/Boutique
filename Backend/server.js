const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

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

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/suits", suitRouter);
app.use("/suits/:id/reviews", reviewRouter);
app.use("/cart", cartRouter);

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
