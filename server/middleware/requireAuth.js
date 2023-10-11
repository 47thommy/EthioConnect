const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!authorization) {
    return res.status(400).json({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await User.findOne({ _id }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    if (!user._id.equals(new mongoose.Types.ObjectId(id))) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = requireAuth;
