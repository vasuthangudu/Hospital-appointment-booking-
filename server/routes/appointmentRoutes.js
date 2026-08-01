const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getUserAppointments,
  cancelAppointment,
  completeAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

// Book new appointment
router.post("/book", bookAppointment);

// Get all appointments (Admin)
router.get("/all-appointments", getAllAppointments);

// Get user appointments by userId
router.get("/user-appointments/:userId", getUserAppointments);

// Get user appointments by email query param only (no userId)
router.get("/user-appointments", getUserAppointments);

// Cancel appointment
router.put("/cancel/:id", cancelAppointment);

// Complete appointment
router.put("/complete/:id", completeAppointment);

// Delete appointment
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
