import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/appointments/all-appointments`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      } else {
        setError(data.message || "Failed to load appointments.");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    if (!window.confirm("Mark this appointment as Completed?")) return;
    setActionLoading(id + "_complete");
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/complete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: "completed" } : a))
        );
      } else {
        alert(data.message || "Failed to complete appointment.");
      }
    } catch {
      alert("Error completing appointment.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    setActionLoading(id + "_cancel");
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/cancel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
        );
      } else {
        alert(data.message || "Failed to cancel appointment.");
      }
    } catch {
      alert("Error cancelling appointment.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this appointment record?")) return;
    setActionLoading(id + "_delete");
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        alert(data.message || "Failed to delete appointment.");
      }
    } catch {
      alert("Error deleting appointment.");
    } finally {
      setActionLoading(null);
    }
  };

  const getDoctorImage = (imagePath) => {
    if (!imagePath) return DEFAULT_AVATAR;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  const getStatusBadge = (status) => {
    const map = {
      booked: "bg-primary",
      completed: "bg-success",
      cancelled: "bg-danger",
    };
    return (
      <span className={`badge rounded-pill ${map[status] || "bg-secondary"} px-2 py-1`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const filtered = appointments.filter((a) => {
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const term = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm ||
      a.patientName?.toLowerCase().includes(term) ||
      a.doctorName?.toLowerCase().includes(term) ||
      a.doctorSpeciality?.toLowerCase().includes(term) ||
      a.patientEmail?.toLowerCase().includes(term);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: appointments.length,
    booked: appointments.filter((a) => a.status === "booked").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#F8F9FD", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-0">All Appointments</h4>
          <p className="text-muted small mb-0">Manage patient appointments in real-time</p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm rounded-pill px-4"
          onClick={fetchAppointments}
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total", key: "all", color: "#5f6fff", icon: "📋" },
          { label: "Booked", key: "booked", color: "#0d6efd", icon: "🗓️" },
          { label: "Completed", key: "completed", color: "#198754", icon: "✅" },
          { label: "Cancelled", key: "cancelled", color: "#dc3545", icon: "❌" },
        ].map((s) => (
          <div className="col-6 col-md-3" key={s.key}>
            <div
              className={`card border-0 shadow-sm rounded-3 p-3 h-100 cursor-pointer ${filterStatus === s.key ? "border border-2 border-primary" : ""}`}
              onClick={() => setFilterStatus(s.key)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                <div>
                  <div className="fw-bold fs-5" style={{ color: s.color }}>{counts[s.key]}</div>
                  <div className="text-muted small">{s.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 rounded-3 mb-4">
          <span>⚠️</span>
          <div>{error}</div>
          <button className="btn btn-sm btn-outline-danger ms-auto" onClick={fetchAppointments}>Retry</button>
        </div>
      )}

      {/* Search + Filter Bar */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div className="input-group flex-grow-1" style={{ maxWidth: "360px" }}>
              <span className="input-group-text bg-white border-end-0">🔍</span>
              <input
                type="text"
                className="form-control border-start-0 shadow-none"
                placeholder="Search patient, doctor, speciality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="btn btn-outline-secondary border-start-0" onClick={() => setSearchTerm("")}>✕</button>
              )}
            </div>
            <div className="d-flex gap-1 flex-wrap">
              {["all", "booked", "completed", "cancelled"].map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm rounded-pill px-3 ${filterStatus === s ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setFilterStatus(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted mt-3">Loading appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem" }}>📭</div>
            <h5 className="fw-bold text-dark mt-3">No Appointments Found</h5>
            <p className="text-muted small">
              {searchTerm || filterStatus !== "all"
                ? "No results match your filter. Try resetting."
                : "No appointments have been booked yet."}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}>
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "#f0f4ff" }}>
                <tr>
                  <th className="ps-4 py-3">#</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Speciality</th>
                  <th>Date & Time</th>
                  <th>Fee</th>
                  <th>Status</th>
                  <th className="text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt, index) => (
                  <tr key={appt._id} className={appt.status === "cancelled" ? "table-danger bg-opacity-10" : appt.status === "completed" ? "table-success bg-opacity-10" : ""}>
                    <td className="ps-4 text-muted small">{index + 1}</td>

                    {/* Doctor */}
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={getDoctorImage(appt.doctorImage)}
                          alt={appt.doctorName}
                          className="rounded-circle border"
                          style={{ width: "38px", height: "38px", objectFit: "cover" }}
                          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AVATAR; }}
                        />
                        <span className="fw-semibold small">{appt.doctorName}</span>
                      </div>
                    </td>

                    {/* Patient */}
                    <td>
                      <div className="fw-semibold small">{appt.patientName}</div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>{appt.patientEmail}</div>
                    </td>

                    <td>
                      <span className="badge bg-light text-primary border border-primary-subtle rounded-pill px-2">
                        {appt.doctorSpeciality}
                      </span>
                    </td>

                    <td>
                      <div className="small fw-semibold">{appt.slotDate}</div>
                      <div className="text-muted small">⏰ {appt.slotTime}</div>
                    </td>

                    <td className="fw-semibold text-success small">₹{appt.fee}</td>

                    <td>{getStatusBadge(appt.status)}</td>

                    {/* Actions */}
                    <td className="pe-4">
                      <div className="d-flex gap-1 justify-content-center">
                        {appt.status === "booked" && (
                          <>
                            <button
                              className="btn btn-success btn-sm rounded-pill px-2 py-1"
                              title="Mark Completed"
                              onClick={() => handleComplete(appt._id)}
                              disabled={actionLoading === appt._id + "_complete"}
                              style={{ fontSize: "0.75rem" }}
                            >
                              {actionLoading === appt._id + "_complete" ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : "✓ Done"}
                            </button>
                            <button
                              className="btn btn-warning btn-sm rounded-pill px-2 py-1"
                              title="Cancel Appointment"
                              onClick={() => handleCancel(appt._id)}
                              disabled={actionLoading === appt._id + "_cancel"}
                              style={{ fontSize: "0.75rem" }}
                            >
                              {actionLoading === appt._id + "_cancel" ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : "✕ Cancel"}
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill px-2 py-1"
                          title="Delete Record"
                          onClick={() => handleDelete(appt._id)}
                          disabled={actionLoading === appt._id + "_delete"}
                          style={{ fontSize: "0.75rem" }}
                        >
                          {actionLoading === appt._id + "_delete" ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : "🗑"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-muted small text-end mt-3">
        Showing {filtered.length} of {appointments.length} appointments
      </p>
    </div>
  );
};

export default Appointments;