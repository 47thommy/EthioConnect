const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id", requireAuth, getUser);
router.get("/", getAllUsers);
router.patch("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

module.exports = router;
