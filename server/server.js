const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

dotenv.config();

// ── CORS ─────────────────────────────────────────────────────────────────────
// Express 5 uses path-to-regexp which does not support bare '*' wildcards,
// so we use app.use(cors()) without app.options("*") — cors() already handles
// OPTIONS preflight requests when used as middleware.
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// ── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Serve static files from uploads directory inside the server folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const doctorRoutes = require("./routes/doctorRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const Doctor = require("./models/Doctor");

// Function to connect to MongoDB with a dev fallback to in-memory server
async function connectToDatabase() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl && process.env.NODE_ENV === 'production') {
    console.error("Missing MONGO_URL environment variable in production. Exiting.");
    process.exit(1);
  }

  try {
    if (mongoUrl) {
      console.log(`Attempting MongoDB connection to ${mongoUrl} ...`);
      await mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("Connected to MongoDB at", mongoUrl);
      return;
    }
    throw new Error('No MONGO_URL provided');
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message || err);
    // Ensure mongoose is disconnected before fallback
    try { await mongoose.disconnect(); } catch (e) {}

    // In development, start an in-memory MongoDB so the app still runs
    if (process.env.NODE_ENV !== 'production') {
      console.log("Starting in-memory MongoDB for development...");
      let MongoMemoryServer;
      try {
        MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
      } catch (e) {
        console.error("Optional dev dependency 'mongodb-memory-server' is not installed.");
        console.error("To enable an in-memory fallback, run: cd server && npm install mongodb-memory-server --save-dev");
        console.error("Or start a local MongoDB and set MONGO_URL in server/.env");
        process.exit(1);
      }

      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log(`In-memory MongoDB URI: ${uri}`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("Connected to in-memory MongoDB");
      // keep mongod reference on app for potential shutdown
      app.locals.mongod = mongod;
    } else {
      process.exit(1);
    }
  }
}

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running", timestamp: new Date().toISOString() });
});

app.use('/api/doctors', doctorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectToDatabase();

  // Seed a sample doctor if none exist so the frontend has data to display
  try {
    const count = await Doctor.countDocuments();
    if (count === 0) {
      await Doctor.create({
        name: "Demo Doctor",
        email: "demo@hospital.local",
        password: "password",
        experience: 5,
        fee: 100,
        speciality: "General",
        education: "MBBS",
        address: "123 Demo St",
        about: "This is a seeded demo doctor.",
        image: null,
        imageFileName: null,
      });
      console.log("Seeded demo doctor into database");
    }
  } catch (e) {
    console.error("Error during DB seeding:", e.message || e);
  }

  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

startServer();

module.exports = app;