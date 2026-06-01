import React from "react";

const Sidebar = () => {
  return (
    <div
      className="bg-white border-end"
      style={{
        width: "260px",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <ul className="nav flex-column pt-4">

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <a
            href="/dashboard"
            className="nav-link d-flex align-items-center"
            style={{
              backgroundColor: "#F2F3FF",
              borderLeft: "5px solid #5F6FFF",
              color: "#515151",
              fontSize: "16px",
              fontWeight: "500",
              padding: "12px 20px",
            }}
          >
            <img
              src="dashboard-icon.png"
              alt="Dashboard"
              width="18"
              height="18"
              className="me-3"
            />
            Dashboard
          </a>
        </li>

        {/* Appointments */}
        <li className="nav-item mb-2">
          <a
            href="/appointments"
            className="nav-link d-flex align-items-center text-dark"
            style={{
              padding: "12px 20px",
              fontSize: "16px",
            }}
          >
            <img
              src="appointment-icon.png"
              alt="Appointments"
              width="18"
              height="18"
              className="me-3"
            />
            Appointments
          </a>
        </li>

        {/* Add Doctor */}
        <li className="nav-item mb-2">
          <a
            href="/add-doctor"
            className="nav-link d-flex align-items-center text-dark"
            style={{
              padding: "12px 20px",
              fontSize: "16px",
            }}
          >
            <img
              src="add-doctor-icon.png"
              alt="Add Doctor"
              width="18"
              height="18"
              className="me-3"
            />
            Add Doctor
          </a>
        </li>

        {/* Doctors List */}
        <li className="nav-item">
          <a
            href="/doctor-list"
            className="nav-link d-flex align-items-center text-dark"
            style={{
              padding: "12px 20px",
              fontSize: "16px",
            }}
          >
            <img
              src="doctor-icon.png"
              alt="Doctors List"
              width="18"
              height="18"
              className="me-3"
            />
            Doctors List
          </a>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;