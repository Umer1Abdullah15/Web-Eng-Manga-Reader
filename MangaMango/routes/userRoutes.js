const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateLibrary,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/", createUser);

// Protected Routes
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUserById);
router.delete("/:id", protect, deleteUserById);
router.patch("/:id/library", protect, updateLibrary);

module.exports = router;
