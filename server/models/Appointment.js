const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: String, default: null },
    patientName: { type: String, required: true, trim: true },
    patientEmail: { type: String, required: true, lowercase: true, trim: true },
    patientPhone: { type: String, default: "N/A" },
    patientAge: { type: Number, default: 25 },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorSpeciality: { type: String, default: "General" },
    doctorImage: { type: String, default: null },
    doctorAddress: { type: String, default: "Hospital Address" },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    fee: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked"
    },
    paymentStatus: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
