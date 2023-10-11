const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email createdAt updatedAt");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such user found" });
    }
    const user = await User.findById(id).select(
      "name email createdAt updatedAt"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such user found" });
    }
    // to update the user i will use the findByIdAndUpdate
    // which will take two properties the id and the the fields to be updated
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
      },
      { ...req.body }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "No such user found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such user found" });
    }
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      res.status(404).json({ message: "No such user found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  login,
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
