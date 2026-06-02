const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const doctorRoutes = require("./routes/doctorRoutes")

const app = express();

dotenv.config();

app.use(bodyParser.json());

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL environment variable. Add it to a .env file or set it in your environment.");
  console.error("Create a file named .env in the server folder with: MONGO_URL=your_mongodb_connection_string");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


app.use('/api/doctors', doctorRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});