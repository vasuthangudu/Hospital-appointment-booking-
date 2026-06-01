import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  FaUserMd,
  FaClipboardList,
  FaUsers
} from "react-icons/fa";

const Main = () => {
  const appointments = [1, 2, 3, 4, 5];

  return (
    <div
      className="flex-grow-1 p-4"
      style={{ background: "#f7f8fc" }}
    >
      {/* Cards */}

      <div className="row g-3">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaUserMd
                size={35}
                className="text-primary me-3"
              />

              <div>
                <h5 className="mb-0">14</h5>
                <small>Doctors</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaClipboardList
                size={35}
                className="text-primary me-3"
              />

              <div>
                <h5 className="mb-0">2</h5>
                <small>Appointments</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <FaUsers
                size={35}
                className="text-primary me-3"
              />

              <div>
                <h5 className="mb-0">5</h5>
                <small>Patients</small>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Latest Appointment */}

      <div className="card mt-4 shadow-sm">
        <div className="card-header bg-white fw-bold">
          Latest Appointment
        </div>

        <div className="card-body">

          {appointments.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border-bottom py-3"
            >
              <div className="d-flex align-items-center">

                <img
                  src="profile.svg"
                  alt=""
                  width="45"
                  height="45"
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

              <button className="btn btn-light rounded-circle">
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