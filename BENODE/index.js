const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URL(s)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/recommendations", recommendationRoutes);

// Add this async function to test the database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("\x1b[32m%s\x1b[0m", "✓ Database connected successfully");
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "✕ Database connection failed:", error);
    process.exit(1);
  }
}

// Call the function when the server starts
testConnection();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
