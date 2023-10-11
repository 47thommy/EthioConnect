const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRETE, { expiresIn: "3d" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login, signup };
