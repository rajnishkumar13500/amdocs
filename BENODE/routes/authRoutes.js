const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/update', authenticateToken, authController.updateProfile);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router; 