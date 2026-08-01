const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

module.exports = Patient;
