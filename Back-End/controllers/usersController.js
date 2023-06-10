const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let user = require("../model/userModel.js");
const { SECRET } = require("../configurations.json");

module.exports.login = async (req, res, next) => {
  try {
    const client = req.body;
    const db = await user.findOne({
      email: client.email,
    });
    if (db) {
      const match = await bcrypt.compare(client.password, db.password);
      if (!match) {
        // return next(new Error("AUTHENTICATION FAILED"));
        res.json({ success: false, results: "AUTHENTICATION FAILED" });
      }
      const token = jwt.sign(
        {
          _id: db._id,
          name: db.name,
          email: db.email,
          role: db.role,
        },
        SECRET
      );
      res.json({ success: true, results: token });
    } else {
      res.json({ success: false, results: "USER DOESN'T EXIST !!" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const new_user = req.body;
    const hashed_password = await bcrypt.hash(new_user.password, 10);
    const results = await user.create({
      ...new_user,
      password: hashed_password,
    });
    res.json({ success: true, results });
  } catch (err) {
    next(err);
  }
};
