const Manga = require('../models/Manga');

const addManga = async (req, res) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json(manga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addManga };
