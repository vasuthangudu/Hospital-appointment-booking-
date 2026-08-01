import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);

  const authUser = JSON.parse(localStorage.getItem("authUser") || "null");

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = authUser?.id || "";
      const email = authUser?.email || "";
      const url = `${API_BASE_URL}/api/appointments/user-appointments/${userId}?email=${encodeURIComponent(email)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        setError(data.message || "Failed to load appointments.");
      }
    } catch (err) {
      console.error("Fetch appointments error:", err);
      setError("Cannot connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setCancelling(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/cancel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === id ? { ...appt, status: "cancelled" } : appt))
        );
      } else {
        alert(data.message || "Failed to cancel appointment.");
      }
    } catch (err) {
      alert("Error cancelling appointment. Please try again.");
    } finally {
      setCancelling(null);
    }
  };

  const getDoctorImage = (imagePath) => {
    if (!imagePath) return DEFAULT_AVATAR;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  const getStatusBadge = (status) => {
    const styles = {
      booked: "bg-primary",
      completed: "bg-success",
      cancelled: "bg-danger",
    };
    return (
      <span className={`badge rounded-pill ${styles[status] || "bg-secondary"} px-3 py-1`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBar />

      <div className="container py-5 flex-grow-1">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-0">My Appointments</h3>
            <p className="text-muted small mb-0">Track and manage your booked appointments</p>
          </div>
          <button
            className="btn btn-outline-primary rounded-pill btn-sm px-4"
            onClick={fetchAppointments}
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 shadow-sm mb-4">
            <span>⚠️</span>
            <div>{error}</div>
            <button className="btn btn-sm btn-outline-danger ms-auto" onClick={fetchAppointments}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted mt-3">Loading your appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <div style={{ fontSize: "3.5rem" }}>📋</div>
            <h4 className="fw-bold text-dark mt-3 mb-2">No Appointments Yet</h4>
            <p className="text-muted mb-4">You haven't booked any appointments. Browse our doctors and schedule one today.</p>
            <a href="/doctors" className="btn btn-primary rounded-pill px-5 fw-semibold mx-auto" style={{ width: "fit-content" }}>
              Browse Doctors
            </a>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {appointments.map((appt) => {
              const isCancelled = appt.status === "cancelled";
              const isCompleted = appt.status === "completed";
              const isCancellingThis = cancelling === appt._id;

              return (
                <div
                  key={appt._id}
                  className={`card border-0 shadow-sm rounded-4 bg-white ${isCancelled ? "opacity-75" : ""}`}
                >
                  <div className="card-body p-4">
                    <div className="row g-3 align-items-center">
                      {/* Doctor Image */}
                      <div className="col-auto">
                        <div
                          className="rounded-3 overflow-hidden border bg-light"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <img
                            src={getDoctorImage(appt.doctorImage)}
                            alt={appt.doctorName}
                            className="w-100 h-100"
                            style={{ objectFit: "cover", objectPosition: "top" }}
                            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="col">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                          <h5 className="fw-bold text-dark mb-0">{appt.doctorName}</h5>
                          {getStatusBadge(appt.status)}
                        </div>
                        <p className="text-primary small fw-semibold mb-2">{appt.doctorSpeciality}</p>
                        <div className="row g-2 small text-muted">
                          <div className="col-12 col-sm-6">
                            📅 <strong>Date:</strong> {appt.slotDate}
                          </div>
                          <div className="col-12 col-sm-6">
                            ⏰ <strong>Time:</strong> {appt.slotTime}
                          </div>
                          {appt.doctorAddress && appt.doctorAddress !== "Hospital Address" && (
                            <div className="col-12">
                              📍 <strong>Address:</strong> {appt.doctorAddress}
                            </div>
                          )}
                          <div className="col-12 col-sm-6">
                            💵 <strong>Fee:</strong> ₹{appt.fee}
                          </div>
                          <div className="col-12 col-sm-6">
                            🗓️ <strong>Booked on:</strong>{" "}
                            {new Date(appt.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-12 col-md-auto d-flex flex-md-column gap-2">
                        {!isCancelled && !isCompleted && (
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill px-4 fw-semibold"
                            onClick={() => handleCancel(appt._id)}
                            disabled={isCancellingThis}
                          >
                            {isCancellingThis ? (
                              <><span className="spinner-border spinner-border-sm me-1"></span>Cancelling...</>
                            ) : (
                              "Cancel Appointment"
                            )}
                          </button>
                        )}
                        {isCancelled && (
                          <span className="text-danger small fw-semibold">
                            ✕ Appointment Cancelled
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-success small fw-semibold">
                            ✓ Appointment Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyAppointments;