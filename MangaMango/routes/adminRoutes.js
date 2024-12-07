const express = require('express');
const { addManga } = require('../controllers/adminController');
const router = express.Router();

router.post('/manga', addManga);

module.exports = router;
