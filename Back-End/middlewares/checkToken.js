const { SECRET } = require("../configurations.json");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorize_string = req.headers["authorization"];
    if (!authorize_string) return next(new Error("Token is required"));
    const token = authorize_string.split(" ")[1];
    const decoded_token = jwt.verify(token, SECRET);
    req.token = decoded_token;
    next();
  } catch (error) {
    next(error);
  }
};
