const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  experience: { type: Number, default: 0 },
  fee: { type: Number, default: 0 },
  speciality: { type: String, default: 'General' },
  education: { type: String, default: 'Pending' },
  address: { type: String, default: 'Pending' },
  about: { type: String, default: 'Pending' },
  image: { type: String, default: null },
  imageFileName: { type: String, default: null },
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
 
module.exports = Doctor;