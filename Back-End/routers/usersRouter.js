const express = require("express");
const {
  login,
  signup,
} = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.post("/login", login);
usersRouter.post("/signup", signup);

module.exports = usersRouter;
