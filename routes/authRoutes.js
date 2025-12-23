// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// المسار المطلوب: POST /api/admin/login
router.post('/admin/login', authController.loginAdmin); 

module.exports = router;