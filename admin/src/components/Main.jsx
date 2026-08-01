import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=80&q=80";

const Main = () => {
  const [stats, setStats] = useState({ doctors: 0, appointments: 0, patients: 0 });
  const [latestAppointments, setLatestAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchLatestAppointments();
  }, []);

  const fetchStats = async () => {
    try {
      const [doctorsRes, apptsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/doctors/all-doctors`),
        fetch(`${API_BASE_URL}/api/appointments/all-appointments`),
      ]);
      const doctorsData = await doctorsRes.json();
      const apptsData = await apptsRes.json();

      const appointments = apptsData.appointments || [];
      const uniquePatients = new Set(appointments.map((a) => a.patientEmail)).size;

      setStats({
        doctors: doctorsData.count || 0,
        appointments: appointments.length,
        patients: uniquePatients,
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  const fetchLatestAppointments = async () => {
    try {
      setLoadingAppts(true);
      const res = await fetch(`${API_BASE_URL}/api/appointments/all-appointments`);
      const data = await res.json();
      if (data.success) {
        setLatestAppointments((data.appointments || []).slice(0, 6));
      }
    } catch (err) {
      console.error("Error fetching latest appointments:", err);
    } finally {
      setLoadingAppts(false);
    }
  };

  const getDoctorImage = (imagePath) => {
    if (!imagePath) return DEFAULT_AVATAR;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  const getStatusBadge = (status) => {
    const map = { booked: "bg-primary", completed: "bg-success", cancelled: "bg-danger" };
    return (
      <span className={`badge rounded-pill ${map[status] || "bg-secondary"} px-2`} style={{ fontSize: "0.7rem" }}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex-grow-1 p-4" style={{ backgroundColor: "#F8F9FD", minHeight: "100vh" }}>
      {/* Dashboard Stats */}
      <div className="row g-3 mb-4">
        {/* Doctors */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#e8eaff", fontSize: "1.5rem" }}
              >
                👨‍⚕️
              </div>
              <div>
                <h4 className="mb-0 fw-bold">{stats.doctors}</h4>
                <small className="text-muted">Total Doctors</small>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#e8f4ff", fontSize: "1.5rem" }}
              >
                📅
              </div>
              <div>
                <h4 className="mb-0 fw-bold">{stats.appointments}</h4>
                <small className="text-muted">Total Appointments</small>
              </div>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center gap-3 p-4">
              <div
                className="rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#e8fff4", fontSize: "1.5rem" }}
              >
                🧑‍🤝‍🧑
              </div>
              <div>
                <h4 className="mb-0 fw-bold">{stats.patients}</h4>
                <small className="text-muted">Unique Patients</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 px-4 d-flex align-items-center justify-content-between border-0">
          <h6 className="fw-bold mb-0 text-dark">Latest Appointments</h6>
          <a href="/appointments" className="btn btn-sm btn-outline-primary rounded-pill px-3" style={{ fontSize: "0.8rem" }}>
            View All
          </a>
        </div>

        <div className="card-body p-0">
          {loadingAppts ? (
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
              <p className="text-muted small mt-2 mb-0">Loading...</p>
            </div>
          ) : latestAppointments.length === 0 ? (
            <div className="text-center py-5 px-4">
              <div style={{ fontSize: "2.5rem" }}>📭</div>
              <h6 className="fw-bold text-dark mt-2">No Appointments Yet</h6>
              <p className="text-muted small mb-0">Appointments booked by patients will appear here.</p>
            </div>
          ) : (
            latestAppointments.map((appt, index) => (
              <div
                key={appt._id}
                className={`d-flex align-items-center justify-content-between px-4 py-3 ${index !== latestAppointments.length - 1 ? "border-bottom" : ""}`}
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={getDoctorImage(appt.doctorImage)}
                    alt={appt.doctorName}
                    className="rounded-circle border"
                    style={{ width: "42px", height: "42px", objectFit: "cover" }}
                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                  />
                  <div>
                    <div className="fw-semibold small text-dark">{appt.doctorName}</div>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      👤 {appt.patientName} &nbsp;•&nbsp; ⏰ {appt.slotTime}, {appt.slotDate}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  {getStatusBadge(appt.status)}
                  <span className="text-success fw-semibold small">₹{appt.fee}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;