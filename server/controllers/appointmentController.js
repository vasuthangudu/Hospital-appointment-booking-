const Appointment = require("../models/Appointment");

// Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      doctorId,
      doctorName,
      doctorSpeciality,
      doctorImage,
      doctorAddress,
      slotDate,
      slotTime,
      fee
    } = req.body;

    if (!patientName || !patientEmail || !doctorId || !doctorName || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "Missing required appointment fields."
      });
    }

    const newAppointment = new Appointment({
      patientId: patientId || null,
      patientName,
      patientEmail: patientEmail.toLowerCase().trim(),
      patientPhone: patientPhone || "N/A",
      patientAge: patientAge ? Number(patientAge) : 25,
      doctorId,
      doctorName,
      doctorSpeciality: doctorSpeciality || "General",
      doctorImage: doctorImage || null,
      doctorAddress: doctorAddress || "Hospital Address",
      slotDate,
      slotTime,
      fee: fee !== undefined ? Number(fee) : 0,
      status: "booked"
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      success: true,
      data: savedAppointment,
      message: "Appointment booked successfully!"
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to book appointment"
    });
  }
};

// Get all appointments (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Get user appointments (Patient)
const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.query;

    let query = {};
    if (userId && userId !== "undefined" && userId !== "null") {
      query.$or = [{ patientId: userId }];
      if (email) {
        query.$or.push({ patientEmail: email.toLowerCase().trim() });
      }
    } else if (email) {
      query.patientEmail = email.toLowerCase().trim();
    }

    const appointments = await Appointment.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
      message: "Appointment cancelled successfully"
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
      message: "Appointment completed successfully"
    });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getUserAppointments,
  cancelAppointment,
  completeAppointment,
  deleteAppointment
};
