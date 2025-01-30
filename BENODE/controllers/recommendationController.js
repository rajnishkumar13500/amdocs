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
        where: { id: req.user.id },
        include: {
          enrolledCourses: {
            include: {
              course: true,
            },
          },
        },
      });

      // Calculate engagement score (0-100) based on multiple factors
      const engagementScore = Math.min(100, Math.round(
        // Platform visits (0-25 points) - normalized from 1-10 scale
        (Math.min(user.platformVisited, 10) / 10 * 25) +
        // Weekly study hours (0-25 points) - normalized from 1-15 scale
        (Math.min(user.WeeklyHours, 15) / 15 * 25) +
        // Learning pace (0-25 points) - convert 0-2 scale to 0-25 points
        (user.learningPace / 2 * 25) +
        // Course progress (0-25 points)
        (user.enrolledCourses.length > 0 
          ? (user.enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / 
             (user.enrolledCourses.length * 100) * 25)
          : 0)
      ));

      // Calculate average completion rate for course history
      const avgCompletionRate = user.enrolledCourses.length > 0
        ? user.enrolledCourses.reduce((acc, curr) => acc + curr.progress, 0) / user.enrolledCourses.length
        : 0;

      // Format course history data to match ML model expectations
      const courseHistory = user.enrolledCourses.map(enrollment => {
        const enrolledDate = new Date(enrollment.enrolledAt);
        const durationDays = parseInt(enrollment.course.Duration) || 0;
        const endDate = new Date(enrolledDate);
        endDate.setDate(endDate.getDate() + durationDays);
        
        return {
          course_name: enrollment.course.name,
          completion_rate: enrollment.progress / 100,
          score: enrollment.progress * 0.8 + Math.random() * 20,
          start_date: enrolledDate,
          end_date: endDate,
          duration_days: durationDays
        };
      });

      // Normalize values for ML service
      const normalizeTimeAvailable = (value) => {
        // Normalize time_available from 1-15 scale
        return Math.min(Math.max(value, 1), 15);
      };

      const normalizeWeeklyHours = (value) => {
        // Normalize weekly_hours from 1-15 scale
        return Math.min(Math.max(value, 1), 15);
      };

      const normalizePlatformVisits = (value) => {
        // Normalize platform_visits from 1-10 scale
        return Math.min(Math.max(value, 1), 10);
      };

      // Get learning pace description
      const getLearningPaceDescription = (pace) => {
        if (pace === 0) return "Slow";
        if (pace === 1) return "Moderate";
        if (pace === 2) return "Fast";
        return "Unknown";
      };

      // Format user data according to ML service requirements
      const mlUserData = {
        age: user.age,
        education_level: user.education,
        career_goal: user.goals,
        preferred_learning_style: user.learningStyle,
        time_availability_hours_per_week: normalizeTimeAvailable(user.timeAvailable),
        learning_pace: user.learningPace,
        weekly_study_hours: normalizeWeeklyHours(user.WeeklyHours),
        platform_visits_per_week: normalizePlatformVisits(user.platformVisited),
        engagement_score: engagementScore,
        avg_completion_rate: avgCompletionRate,
        skill_python: user.python,
        skill_statistics: user.Statistics,
        'skill_machine learning': user.MachineLearning,
        skill_html_css: user.HTML_CSS,
        skill_javascript: user.JavaScript,
        skill_react: user.React,
        'skill_social media': user.SocialMedia,
        skill_seo: user.SEO,
        skill_analytics: user.Analytics,
        course_history: courseHistory
      };

      const response = await axios.post(`${ML_SERVICE_URL}/recommend`, mlUserData);
      
      // Enhanced response with more detailed information
      const enhancedResponse = {
        ...response.data,
        user_metrics: {
          engagement_score: engagementScore,
          avg_completion_rate: avgCompletionRate,
          total_courses_enrolled: user.enrolledCourses.length,
          learning_activity: {
            weekly_visits: normalizePlatformVisits(user.platformVisited),
            weekly_hours: normalizeWeeklyHours(user.WeeklyHours),
            time_available: normalizeTimeAvailable(user.timeAvailable),
            learning_pace: {
              value: user.learningPace,
              description: getLearningPaceDescription(user.learningPace)
            }
          }
        }
      };

      res.json(enhancedResponse);
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