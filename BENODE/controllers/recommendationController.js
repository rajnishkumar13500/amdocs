const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');

const ML_SERVICE_URL = 'https://amdocsmodel.onrender.com';

const recommendationController = {
  getRecommendations: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          enrolledCourses: {
            include: {
              course: true,
            },
          },
        },
      });

      // Basic recommendation logic based on user preferences and skill levels
      const recommendations = await prisma.course.findMany({
        where: {
          AND: [
            {
              Duration: {
                lte: user.timeAvailable.toString(),
              },
            },
            {
              NOT: {
                id: {
                  in: user.enrolledCourses.map(ec => ec.courseId),
                },
              },
            },
          ],
        },
        take: 5,
      });

      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: 'Error getting recommendations' });
    }
  },

  trainModel: async (req, res) => {
    try {
      const response = await axios.post(`${ML_SERVICE_URL}/train`);
      res.json(response.data);
    } catch (error) {
      console.error('Error training model:', error);
      res.status(500).json({ 
        error: 'Error training model',
        details: error.response?.data || error.message 
      });
    }
  },

  getMlRecommendations: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id }
      });

      // Format user data according to ML service requirements
      const mlUserData = {
        age: user.age,
        education_level: user.education,
        career_goal: user.goals,
        preferred_learning_style: user.learningStyle,
        time_availability_hours_per_week: user.timeAvailable,
        learning_pace: user.learningPace,
        weekly_study_hours: user.WeeklyHours,
        platform_visits_per_week: user.platformVisited,
        engagement_score: 0, // You might want to calculate this based on user activity
        skill_python: user.python,
        skill_statistics: user.Statistics,
        'skill_machine learning': user.MachineLearning,
        skill_html_css: user.HTML_CSS,
        skill_javascript: user.JavaScript,
        skill_react: user.React,
        'skill_social media': user.SocialMedia,
        skill_seo: user.SEO,
        skill_analytics: user.Analytics,
        course_history: [] // You might want to add actual course history here
      };

      const response = await axios.post(`${ML_SERVICE_URL}/recommend`, mlUserData);
      res.json(response.data);
    } catch (error) {
      console.error('Error getting ML recommendations:', error);
      res.status(500).json({ 
        error: 'Error getting ML recommendations',
        details: error.response?.data || error.message 
      });
    }
  },

  getFeatureImportance: async (req, res) => {
    try {
      const response = await axios.get(`${ML_SERVICE_URL}/feature-importance`);
      res.json(response.data);
    } catch (error) {
      console.error('Error getting feature importance:', error);
      res.status(500).json({ 
        error: 'Error getting feature importance',
        details: error.response?.data || error.message 
      });
    }
  }
};

module.exports = recommendationController; 