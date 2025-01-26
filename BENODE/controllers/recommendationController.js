const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
};

module.exports = recommendationController; 