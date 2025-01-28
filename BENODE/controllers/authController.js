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

  updateProfile: async (req, res) => {
    try {
      const {
        name,
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
      } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          name: name || undefined,
          education: education || undefined,
          goals: goals || undefined,
          learningStyle: learningStyle || undefined,
          timeAvailable:
            timeAvailable !== undefined ? parseInt(timeAvailable) : undefined,
          learningPace:
            learningPace !== undefined ? parseInt(learningPace) : undefined,
          WeeklyHours:
            WeeklyHours !== undefined ? parseInt(WeeklyHours) : undefined,
          platformVisited:
            platformVisited !== undefined
              ? parseInt(platformVisited)
              : undefined,
          // Skill levels
          python: python !== undefined ? parseInt(python) : undefined,
          Statistics:
            Statistics !== undefined ? parseInt(Statistics) : undefined,
          MachineLearning:
            MachineLearning !== undefined
              ? parseInt(MachineLearning)
              : undefined,
          HTML_CSS: HTML_CSS !== undefined ? parseInt(HTML_CSS) : undefined,
          JavaScript:
            JavaScript !== undefined ? parseInt(JavaScript) : undefined,
          React: React !== undefined ? parseInt(React) : undefined,
          SocialMedia:
            SocialMedia !== undefined ? parseInt(SocialMedia) : undefined,
          SEO: SEO !== undefined ? parseInt(SEO) : undefined,
          Analytics: Analytics !== undefined ? parseInt(Analytics) : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          education: true,
          goals: true,
          learningStyle: true,
          timeAvailable: true,
          learningPace: true,
          WeeklyHours: true,
          platformVisited: true,
          python: true,
          Statistics: true,
          MachineLearning: true,
          HTML_CSS: true,
          JavaScript: true,
          React: true,
          SocialMedia: true,
          SEO: true,
          Analytics: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Error updating profile" });
    }
  },
};

module.exports = authController;
