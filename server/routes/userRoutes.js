const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  getAllUsers,
  getUser,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
