import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const Main = () => {
  const appointments = [1, 2, 3, 4, 5];

  const doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

  const patients =
    JSON.parse(localStorage.getItem("patients")) || [];

  return (
    <div
      className="flex-grow-1 p-4"
      style={{
        backgroundColor: "#F8F9FD",
        minHeight: "100vh",
      }}
    >
      {/* Dashboard Cards */}
      <div className="row g-3">

        {/* Doctors */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <img
                src="/images/doctor_icon.svg"
                alt="Doctor"
                width="40"
                height="40"
                className="me-3"
              />

              <div>
                <h5 className="mb-0 fw-bold">
                  {doctors.length}
                </h5>

                <small className="text-muted">
                  Doctors
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <img
                src="/images/appointments_icon.svg"
                alt="Appointment"
                width="40"
                height="40"
                className="me-3"
              />

              <div>
                <h5 className="mb-0 fw-bold">2</h5>

                <small className="text-muted">
                  Appointments
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <img
                src="/images/patients_icon.svg"
                alt="Patient"
                width="40"
                height="40"
                className="me-3"
              />

              <div>
                <h5 className="mb-0 fw-bold">
                  {patients.length}
                </h5>

                <small className="text-muted">
                  Patients
                </small>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Latest Appointments */}
      <div className="card mt-4 border-0 shadow-sm">
        <div className="card-header bg-white fw-bold">
          Latest Appointments
        </div>

        <div className="card-body">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center py-3 border-bottom"
            >
              <div className="d-flex align-items-center">
                <img
                  src="/images/profile.svg"
                  alt=""
                  width="50"
                  height="50"
                  className="rounded-circle me-3"
                />

                <div>
                  <h6 className="mb-0">
                    Dr. Richard James
                  </h6>

                  <small className="text-muted">
                    Booking on 24th July, 2024
                  </small>
                </div>
              </div>

              <button className="btn btn-outline-danger btn-sm rounded-circle">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

  

    </div>
  );
};

export default Main;