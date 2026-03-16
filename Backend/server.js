const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT;
const mongoose = require("mongoose");
const userRouter = require("./routes/user.js");
const suitRouter = require("./routes/suit.js");
const reviewRouter = require("./routes/review.js");
const path = require("path");

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

app.use(cors());

// app.use(
//   cors({
//     origin: ["http://localhost:5173", process.env.CLIENT_URL],
//     credentials: true,
//   }),
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
});

app.use("/users", userRouter);
app.use("/suit", suitRouter);
app.use("/suit/:id", reviewRouter);

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
