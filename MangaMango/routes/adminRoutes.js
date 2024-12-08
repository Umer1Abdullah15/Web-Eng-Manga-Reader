const express = require('express');
const { login, getMangas, addManga, deleteManga, getMangaById, updateMangaById, getRandomManga } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Login Route
router.post('/login', login);

// Protected Routes
router.get('/manga', protect, getMangas);
router.post('/manga', protect, addManga);
router.delete('/manga/:id', protect, deleteManga);
router.get('/manga/:id', protect, getMangaById);
router.put('/manga/:id', protect, updateMangaById);
router.get('/manga/random', protect, getRandomManga);

module.exports = router;
