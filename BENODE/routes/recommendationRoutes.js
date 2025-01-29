const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, recommendationController.getRecommendations);
router.post('/train', authenticateToken, recommendationController.trainModel);
router.post('/ml-recommendations', authenticateToken, recommendationController.getMlRecommendations);
router.get('/feature-importance', authenticateToken, recommendationController.getFeatureImportance);

module.exports = router; 