import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80";

function AppointmentPage() {
  const { docId } = useParams();
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const getDoctorImage = (doc) => {
    if (!doc || !doc.image) return DEFAULT_AVATAR;
    if (doc.image.startsWith("http://") || doc.image.startsWith("https://")) return doc.image;
    const cleanPath = doc.image.startsWith("/") ? doc.image : `/${doc.image}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  const doctorName = doctor?.name
    ? (doctor.name.startsWith("Dr.") ? doctor.name : `Dr. ${doctor.name}`)
    : "Dr. Richard James";

  const doctorSpeciality = doctor?.speciality || "General Physician";
  const doctorEducation = doctor?.education || "MBBS";
  const doctorAbout = doctor?.about || "Dedicated to providing comprehensive patient-centered care and treatment.";
  const doctorFee = doctor?.fee !== undefined ? doctor.fee : 100;
  const doctorImgSrc = doctor ? getDoctorImage(doctor) : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500";

  const handleConfirm = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // ── Step 1: Ping server health check first ───────────────────────────
      try {
        const healthRes = await fetch(`${API_BASE_URL}/api/health`, { method: "GET" });
        if (!healthRes.ok) throw new Error("Server unhealthy");
      } catch {
        setError(
          `Cannot reach the server at ${API_BASE_URL}. Make sure the backend is running (cd server && node server.js) and try again.`
        );
        setLoading(false);
        return;
      }

      // ── Step 2: Build payload ────────────────────────────────────────────
      const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
      const today = new Date();
      const slotDate = today.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

      const appointmentPayload = {
        patientId: authUser?.id || null,
        patientName: authUser?.fullName || authUser?.name || "Guest Patient",
        patientEmail: authUser?.email || "guest@example.com",
        patientPhone: authUser?.phone || "N/A",
        patientAge: authUser?.age || 25,
        doctorId: doctor?._id || doctor?.id || "unknown",
        doctorName: doctorName,
        doctorSpeciality: doctorSpeciality,
        doctorImage: doctor?.image || null,
        doctorAddress: doctor?.address || "Hospital Address",
        slotDate: slotDate,
        slotTime: selectedSlot,
        fee: doctorFee,
      };

      // ── Step 3: Book appointment ─────────────────────────────────────────
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(appointmentPayload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setError(`Server returned an invalid response (status ${response.status}). Please try again.`);
        setLoading(false);
        return;
      }

      if (data.success) {
        setBookedAppointment(data.data);
        setBookingSuccess(true);
      } else {
        setError(data.message || `Booking failed (HTTP ${response.status}). Please try again.`);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        err.message?.includes("fetch")
          ? `Cannot connect to server at ${API_BASE_URL}. Please make sure the backend server is running.`
          : `Booking failed: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };


  /* ── SUCCESS SCREEN ─────────────────────────────────────────────────── */
  if (bookingSuccess && bookedAppointment) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-light">
        <NavBar />
        <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="card border-0 shadow-lg rounded-4 p-5 text-center" style={{ maxWidth: "550px", width: "100%" }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: "90px", height: "90px", background: "linear-gradient(135deg,#28a745,#20c997)" }}
            >
              <span style={{ fontSize: "2.5rem", color: "#fff" }}>✓</span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Appointment Booked!</h3>
            <p className="text-muted mb-4">Your appointment has been successfully confirmed.</p>

            <div className="bg-light rounded-3 p-3 mb-4 text-start border">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={doctorImgSrc}
                  alt={doctorName}
                  className="rounded-circle border shadow-sm"
                  style={{ width: "56px", height: "56px", objectFit: "cover" }}
                  onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                />
                <div>
                  <div className="fw-bold text-dark">{doctorName}</div>
                  <div className="small text-primary">{doctorSpeciality}</div>
                </div>
              </div>
              <hr className="my-2" />
              <div className="row g-2 small">
                <div className="col-6"><span className="text-muted">📅 Date:</span><br /><strong>{bookedAppointment.slotDate}</strong></div>
                <div className="col-6"><span className="text-muted">⏰ Time:</span><br /><strong>{bookedAppointment.slotTime}</strong></div>
                <div className="col-6"><span className="text-muted">💵 Fee:</span><br /><strong>₹{bookedAppointment.fee}</strong></div>
                <div className="col-6"><span className="text-muted">📌 Status:</span><br /><span className="badge bg-success rounded-pill">{bookedAppointment.status}</span></div>
                <div className="col-12 mt-1"><span className="text-muted">👤 Patient:</span> <strong>{bookedAppointment.patientName}</strong></div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <a href="/my-appointment" className="btn btn-primary rounded-pill flex-grow-1 fw-semibold">View My Appointments</a>
              <a href="/doctors" className="btn btn-outline-secondary rounded-pill flex-grow-1">Browse Doctors</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── BOOKING FORM ───────────────────────────────────────────────────── */
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBar />
      <div className="container py-5 flex-grow-1">
        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 shadow-sm mb-4 rounded-3">
            <span>⚠️</span>
            <div>{error}</div>
            <button className="btn-close ms-auto" onClick={() => setError(null)}></button>
          </div>
        )}

        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-4 text-center">
              <div className="rounded-4 overflow-hidden shadow-sm bg-light" style={{ height: "300px" }}>
                <img
                  src={doctorImgSrc}
                  className="w-100 h-100"
                  alt={doctorName}
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                />
              </div>
            </div>

            <div className="col-12 col-md-8">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 mb-2">
                {doctorSpeciality}
              </span>
              <h2 className="fw-bold text-dark mb-1">{doctorName}</h2>
              <p className="text-muted mb-2">
                🎓 {doctorEducation} {doctor?.experience ? `| ⏳ ${doctor.experience} Years Exp.` : ""}
              </p>
              <p className="text-secondary mb-3">{doctorAbout}</p>

              <div className="p-3 bg-light rounded-3 mb-4 border d-inline-block w-100">
                <span className="fw-semibold text-dark">Consultation Fee: </span>
                <span className="text-success fw-bold fs-5 ms-1">₹{doctorFee}</span>
                {doctor?.address && <div className="small text-muted mt-1">📍 {doctor.address}</div>}
              </div>

              <h5 className="fw-bold text-dark mb-3">Select Time Slot</h5>
              <div className="d-flex gap-2 flex-wrap mb-4">
                {["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:30 PM"].map((slot) => (
                  <button
                    key={slot}
                    className={`btn rounded-pill px-3 py-2 ${selectedSlot === slot ? "btn-primary shadow-sm fw-semibold" : "btn-outline-primary"}`}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={loading}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-primary rounded-pill px-5 fw-semibold shadow-sm d-flex align-items-center gap-2"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
                onClick={handleConfirm}
                disabled={loading || !selectedSlot}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm" role="status"></span> Booking...</>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
              {!selectedSlot && <p className="text-muted small mt-2">⬆ Please select a time slot above to proceed.</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentPage;