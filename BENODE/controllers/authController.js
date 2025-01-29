const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Generate token with more user info
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }

      // Generate token with more user info
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },
  getProfile: async (req, res) => {
    try {
      const profile = await prisma.user.findUnique({
        where: { id: req.user.id },
      });
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Error fetching profile" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        age,
        education,
        goals,
        learningStyle,
        timeAvailable,
        learningPace,
        WeeklyHours,
        platformVisited,
        // Skill levels
        python,
        Statistics,
        MachineLearning,
        HTML_CSS,
        JavaScript,
        React,
        SocialMedia,
        SEO,
        Analytics,
        isUpdated
      } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          age: age !== undefined ? age : undefined,
          education: education || undefined,
          goals: goals || undefined,
          learningStyle: learningStyle || undefined,
          timeAvailable: timeAvailable !== undefined ? timeAvailable : undefined,
          learningPace: learningPace !== undefined ? learningPace : undefined,
          WeeklyHours: WeeklyHours !== undefined ? WeeklyHours : undefined,
          platformVisited: platformVisited !== undefined ? platformVisited : undefined,
          // Skill levels
          python: python !== undefined ? python : undefined,
          Statistics: Statistics !== undefined ? Statistics : undefined,
          MachineLearning: MachineLearning !== undefined ? MachineLearning : undefined,
          HTML_CSS: HTML_CSS !== undefined ? HTML_CSS : undefined,
          JavaScript: JavaScript !== undefined ? JavaScript : undefined,
          React: React !== undefined ? React : undefined,
          SocialMedia: SocialMedia !== undefined ? SocialMedia : undefined,
          SEO: SEO !== undefined ? SEO : undefined,
          Analytics: Analytics !== undefined ? Analytics : undefined,
          isupdated: isUpdated !== undefined ? isUpdated : undefined
        },
      });

      res.json({
        message: "Profile updated successfully",
        user: updatedUser
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  },
};

module.exports = authController;
