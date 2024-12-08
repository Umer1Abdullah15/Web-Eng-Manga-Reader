const Manga = require('../models/Manga');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock Admin User (Replace with a DB in real-world applications)
const admin = {
  username: "admin",
  password: "$2a$10$3ZB9IsFaQseNUubY0bjjU..5fx.fhJI7CfxoxMgRmXNPXzUuf.iWC" // hashed password for 'password123'
};

// Login Controller
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    if (username !== admin.username || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

// Get all mangas
exports.getMangas = async (req, res, next) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (error) {
    next(error);
  }
};

// Add a new manga
exports.addManga = async (req, res, next) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json({ message: 'Manga added successfully', manga });
  } catch (error) {
    next(error);
  }
};

// Delete a manga
exports.deleteManga = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Manga.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.status(200).json({ message: 'Manga deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get manga by ID
exports.getMangaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const manga = await Manga.findOne({ id });
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.status(200).json(manga);
  } catch (error) {
    next(error);
  }
};

// Update manga by ID
exports.updateMangaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedManga = await Manga.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedManga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.status(200).json({
      message: 'Manga updated successfully',
      manga: updatedManga,
    });
  } catch (error) {
    next(error);
  }
};

// Get a random manga
exports.getRandomManga = async (req, res, next) => {
  try {
    const count = await Manga.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No mangas available' });
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomManga = await Manga.findOne().skip(randomIndex);
    res.status(200).json(randomManga);
  } catch (error) {
    next(error);
  }
};