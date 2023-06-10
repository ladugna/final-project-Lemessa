const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const usersRouter = require("./routers/usersRouter");
const { DB_ADDRESS } = require("./configurations.json");
const propertyRouter = require("./routers/propertyRouter");
const offerRouter = require("./routers/offerRouter");

// const checkName = require("./middlewares/checkPrice");
// const checkToken = require("./middlewares/checkToken");

const app = express();

app.use(cors());
app.options(
  "*",
  cors({
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
(async function () {
  try {
    await mongoose.connect(DB_ADDRESS);
    console.log(`connected to DB`);
  } catch (e) {
    console.log(`Error connecting to DB`, e);
  }
})();

app.use(express.json());
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/images", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/offers", offerRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new Error("No route found"));
});

// error handle

app.use((error, req, res, next) => {
  res.status(500).json({ success: false, data: error.message });
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

process.on("exit", () => {
  mongoose.disconnect();
});
