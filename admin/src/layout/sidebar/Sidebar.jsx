import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuStyle = {
    padding: "12px 20px",
    fontSize: "16px",
    textDecoration: "none",
    color: "#515151",
  };

  const activeStyle = {
    backgroundColor: "#F2F3FF",
    borderLeft: "5px solid #5F6FFF",
    fontWeight: "500",
    color: "#515151",
  };

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
          <NavLink
            to="/"
            end
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              ...menuStyle,
              ...(isActive ? activeStyle : {}),
            })}
          >
            <img
              src="/images/dashboard-icon.png"
              alt="Dashboard"
              width="18"
              height="18"
              className="me-3"
            />
            Dashboard
          </NavLink>
        </li>

        {/* Appointments */}
        <li className="nav-item mb-2">
          <NavLink
            to="/appointments"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              ...menuStyle,
              ...(isActive ? activeStyle : {}),
            })}
          >
            <img
              src="/images/appointment-icon.png"
              alt="Appointments"
              width="18"
              height="18"
              className="me-3"
            />
            Appointments
          </NavLink>
        </li>

        {/* Add Doctor */}
        <li className="nav-item mb-2">
          <NavLink
            to="/add-doctor"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              ...menuStyle,
              ...(isActive ? activeStyle : {}),
            })}
          >
            <img
              src="/images/add-doctor-icon.png"
              alt="Add Doctor"
              width="18"
              height="18"
              className="me-3"
            />
            Add Doctor
          </NavLink>
        </li>

        {/* Doctors List */}
        <li className="nav-item mb-2">
          <NavLink
            to="/doctor-list"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              ...menuStyle,
              ...(isActive ? activeStyle : {}),
            })}
          >
            <img
              src="/images/doctor-icon.png"
              alt="Doctors List"
              width="18"
              height="18"
              className="me-3"
            />
            Doctors List
          </NavLink>
        </li>

        {/* Patient List */}
        <li className="nav-item mb-2">
          <NavLink
            to="/patient-list"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              ...menuStyle,
              ...(isActive ? activeStyle : {}),
            })}
          >
            <img
              src="/images/patients.png"
              alt="Patient List"
              width="18"
              height="18"
              className="me-3"
            />
            Patient List
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;