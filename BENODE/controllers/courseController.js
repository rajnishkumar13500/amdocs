const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await prisma.course.findMany();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching courses' });
    }
  },

  getCourse: async (req, res) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          enrolledUsers: true,
        },
      });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching course' });
    }
  },

  createCourse: async (req, res) => {
    try {
      const course = await prisma.course.create({
        data: req.body,
      });
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error creating course' });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const course = await prisma.course.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error updating course' });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      await prisma.course.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting course' });
    }
  },

  enrollCourse: async (req, res) => {
    try {
      const enrollment = await prisma.userCourse.create({
        data: {
          userId: req.user.id,
          courseId: parseInt(req.params.id),
        },
      });
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ error: 'Error enrolling in course' });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const{cId,progress} = req.body;
      
      const enrollment = await prisma.userCourse.update({
        where: {
          userId_courseId: {
            userId: req.user.id,
            courseId: cId,
          },
        },
        data: { progress },
      });
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: 'Error updating progress' });
    }
  },
};

module.exports = courseController; 