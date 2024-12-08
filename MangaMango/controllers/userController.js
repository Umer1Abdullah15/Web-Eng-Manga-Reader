const User = require("../models/User");
const Manga = require("../models/Manga");
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    next(error);
  }
};


// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("library.manga");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("library.manga");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user by ID
exports.updateUserById = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Manage user library
exports.updateLibrary = async (req, res, next) => {
  const { mangaId, rating, comment } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const libraryItem = user.library.find((item) => item.manga.toString() === mangaId);
    if (libraryItem) {
      // Update existing item
      libraryItem.rating = rating || libraryItem.rating;
      libraryItem.comment = comment || libraryItem.comment;
    } else {
      // Add new item
      user.library.push({ manga: mangaId, rating, comment });
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
