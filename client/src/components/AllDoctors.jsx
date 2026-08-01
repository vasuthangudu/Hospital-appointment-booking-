import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://hospital-appointment-booking-1-mzml.onrender.com";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80";

function AllDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDoctor, setActiveDoctor] = useState(null);

  const defaultSpecialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist"
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/doctors/all-doctors`);
      const data = await response.json();

      if (data.success) {
        setDoctors(data.data || []);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch doctors");
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Unable to connect to server. Please check backend API.");
    } finally {
      setLoading(false);
    }
  };

  const getDoctorImage = (doctor) => {
    if (!doctor || !doctor.image) {
      return DEFAULT_AVATAR;
    }
    if (doctor.image.startsWith("http://") || doctor.image.startsWith("https://")) {
      return doctor.image;
    }
    const cleanPath = doctor.image.startsWith("/") ? doctor.image : `/${doctor.image}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // Combine default specialities with any custom specialities added by admin
  const availableSpecialities = Array.from(
    new Set([
      "All",
      ...defaultSpecialities,
      ...doctors.map((d) => d.speciality).filter(Boolean)
    ])
  );

  // Filter doctors based on selected speciality and search term
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpeciality =
      selectedSpeciality === "All" ||
      doctor.speciality?.toLowerCase() === selectedSpeciality.toLowerCase();

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      doctor.name?.toLowerCase().includes(searchLower) ||
      doctor.speciality?.toLowerCase().includes(searchLower) ||
      doctor.education?.toLowerCase().includes(searchLower) ||
      doctor.address?.toLowerCase().includes(searchLower);

    return matchesSpeciality && matchesSearch;
  });

  const handleBookAppointment = (doctor) => {
    navigate("/appointment", { state: { doctor } });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBar />

      <div className="container py-4 flex-grow-1">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Browse All Doctors</h2>
            <p className="text-muted mb-0">
              Find and book appointments with verified specialists.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-100 w-md-auto" style={{ maxWidth: "350px" }}>
            <div className="input-group shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0 ps-3">
                🔍
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none ps-1"
                placeholder="Search by doctor name or speciality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-white border-0 text-muted pe-3"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 shadow-sm">
            <span>⚠️</span>
            <div>{error}</div>
            <button
              className="btn btn-sm btn-outline-danger ms-auto"
              onClick={fetchDoctors}
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Fetching doctors list...</p>
          </div>
        ) : (
          <div className="row g-4">
            {/* Sidebar Filter */}
            <div className="col-12 col-md-3 col-lg-2">
              <div className="card border-0 shadow-sm p-3 rounded-4 bg-white sticky-top" style={{ top: "90px" }}>
                <h6 className="fw-bold text-secondary mb-3 text-uppercase fs-7 tracking-wide">
                  Filter by Speciality
                </h6>
                <div className="d-flex flex-column gap-2">
                  {availableSpecialities.map((item) => {
                    const isActive = selectedSpeciality === item;
                    return (
                      <button
                        key={item}
                        className={`btn text-start rounded-3 py-2 px-3 transition-all ${
                          isActive
                            ? "btn-primary shadow-sm fw-semibold"
                            : "btn-light text-secondary hover-bg-primary"
                        }`}
                        onClick={() => setSelectedSpeciality(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="col-12 col-md-9 col-lg-10">
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm p-4">
                  <div style={{ fontSize: "3rem" }}>👨‍⚕️</div>
                  <h4 className="fw-bold text-dark mt-2">No Doctors Found</h4>
                  <p className="text-muted mb-3">
                    {searchTerm || selectedSpeciality !== "All"
                      ? "No doctors matched your filter criteria. Try resetting filters."
                      : "No doctors have been added by admin yet."}
                  </p>
                  {(searchTerm || selectedSpeciality !== "All") && (
                    <button
                      className="btn btn-outline-primary rounded-pill px-4"
                      onClick={() => {
                        setSelectedSpeciality("All");
                        setSearchTerm("");
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-4">
                  {filteredDoctors.map((doctor) => {
                    const formattedName = doctor.name.startsWith("Dr.")
                      ? doctor.name
                      : `Dr. ${doctor.name}`;

                    return (
                      <div
                        key={doctor._id}
                        className="col-12 col-sm-6 col-lg-4 col-xl-3"
                      >
                        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden doctor-card bg-white d-flex flex-column">
                          {/* Image Box */}
                          <div
                            className="position-relative bg-light overflow-hidden"
                            style={{ height: "240px" }}
                          >
                            <img
                              src={getDoctorImage(doctor)}
                              className="w-100 h-100"
                              alt={doctor.name}
                              style={{ objectFit: "cover", objectPosition: "top" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DEFAULT_AVATAR;
                              }}
                            />
                            <span className="position-absolute top-0 end-0 m-3 badge bg-success shadow-sm rounded-pill px-2.5 py-1.5 d-flex align-items-center gap-1">
                              <span className="pulse-dot"></span> Available
                            </span>
                          </div>

                          {/* Body Details */}
                          <div className="card-body p-3.5 d-flex flex-column flex-grow-1">
                            <h5 className="card-title fw-bold text-dark mb-1 text-truncate" title={formattedName}>
                              {formattedName}
                            </h5>
                            <p className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill text-start align-self-start mb-2 px-2.5 py-1">
                              {doctor.speciality || "General Physician"}
                            </p>

                            <div className="small text-secondary mb-3 flex-grow-1">
                              {doctor.education && (
                                <div className="mb-1 text-truncate" title={doctor.education}>
                                  🎓 <strong>Degree:</strong> {doctor.education}
                                </div>
                              )}
                              {doctor.experience !== undefined && doctor.experience !== null && (
                                <div className="mb-1">
                                  ⏳ <strong>Experience:</strong> {doctor.experience} {Number(doctor.experience) === 1 ? 'Year' : 'Years'}
                                </div>
                              )}
                              {doctor.fee !== undefined && doctor.fee !== null && (
                                <div className="mb-1 fw-semibold text-dark">
                                  💵 <strong>Fee:</strong> ₹{doctor.fee}
                                </div>
                              )}
                              {doctor.address && doctor.address !== "Pending" && (
                                <div className="text-truncate" title={doctor.address}>
                                  📍 {doctor.address}
                                </div>
                              )}
                            </div>

                            {/* Card Actions */}
                            <div className="d-flex gap-2 mt-auto pt-2 border-top">
                              <button
                                className="btn btn-light btn-sm rounded-pill flex-grow-1 text-secondary fw-semibold border"
                                onClick={() => setActiveDoctor(doctor)}
                              >
                                Details
                              </button>
                              <button
                                className="btn btn-primary btn-sm rounded-pill flex-grow-1 fw-semibold shadow-sm"
                                onClick={() => handleBookAppointment(doctor)}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Doctor Detail Modal */}
      {activeDoctor && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-primary text-white py-3 px-4">
                <h5 className="modal-title fw-bold">
                  {activeDoctor.name.startsWith("Dr.") ? activeDoctor.name : `Dr. ${activeDoctor.name}`}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setActiveDoctor(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-4 align-items-start">
                  <div className="col-12 col-md-4 text-center">
                    <img
                      src={getDoctorImage(activeDoctor)}
                      alt={activeDoctor.name}
                      className="img-fluid rounded-4 shadow-sm border"
                      style={{ maxHeight: "280px", width: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_AVATAR;
                      }}
                    />
                    <div className="mt-3">
                      <span className="badge bg-success shadow-sm rounded-pill px-3 py-2">
                        ● Available for Appointment
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-md-8">
                    <h4 className="fw-bold mb-1">
                      {activeDoctor.name.startsWith("Dr.") ? activeDoctor.name : `Dr. ${activeDoctor.name}`}
                    </h4>
                    <p className="text-primary fw-semibold fs-6 mb-3">
                      {activeDoctor.speciality || "General Physician"}
                    </p>

                    <div className="bg-light p-3 rounded-3 mb-3 border">
                      <div className="row g-2 small">
                        <div className="col-6">
                          <strong>🎓 Education:</strong> {activeDoctor.education || "N/A"}
                        </div>
                        <div className="col-6">
                          <strong>⏳ Experience:</strong> {activeDoctor.experience || 0} Years
                        </div>
                        <div className="col-6">
                          <strong>💵 Fee:</strong> ₹{activeDoctor.fee || 0}
                        </div>
                        <div className="col-6">
                          <strong>📧 Email:</strong> {activeDoctor.email || "N/A"}
                        </div>
                        <div className="col-12 mt-2">
                          <strong>📍 Address:</strong> {activeDoctor.address || "N/A"}
                        </div>
                      </div>
                    </div>

                    <h6 className="fw-bold mb-2">About Doctor</h6>
                    <p className="text-muted small leading-relaxed mb-4">
                      {activeDoctor.about && activeDoctor.about !== "Pending"
                        ? activeDoctor.about
                        : "No description provided for this doctor yet."}
                    </p>

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={() => setActiveDoctor(null)}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary rounded-pill px-4 fw-semibold"
                        onClick={() => {
                          const doc = activeDoctor;
                          setActiveDoctor(null);
                          handleBookAppointment(doc);
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .doctor-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .doctor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.12) !important;
        }
        .pulse-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default AllDoctors;
