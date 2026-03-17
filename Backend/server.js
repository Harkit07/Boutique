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
const https = require("https");

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

// ✅ Health check endpoint (required for keep-alive ping)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "alive", uptime: process.uptime() });
});

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

// ✅ Keep-alive self-ping function (prevents Render sleep)
const keepAlive = () => {
  const url = process.env.RENDER_URL || `http://localhost:${port}/health`;

  // Only ping in production
  if (process.env.NODE_ENV === "production") {
    setInterval(
      () => {
        https
          .get(url, (res) => {
            console.log(`Keep-alive ping: ${res.statusCode}`);
          })
          .on("error", (err) => {
            console.log("Keep-alive error:", err.message);
          });
      },
      10 * 60 * 1000,
    ); // ping every 10 minutes
    console.log("Keep-alive started ✅");
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  keepAlive();
});
