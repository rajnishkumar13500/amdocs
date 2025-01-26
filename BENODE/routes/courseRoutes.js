const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);
router.post('/', authenticateToken, courseController.createCourse);
router.put('/:id', authenticateToken, courseController.updateCourse);
router.delete('/:id', authenticateToken, courseController.deleteCourse);
router.post('/:id/enroll', authenticateToken, courseController.enrollCourse);
router.put('/:id/progress', authenticateToken, courseController.updateProgress);

module.exports = router; 