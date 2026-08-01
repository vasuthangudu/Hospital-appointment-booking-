import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./layout/navbar/Navbar";
import Sidebar from "./layout/sidebar/Sidebar";

import Main from "./components/Main";
import Appointments from "./components/Appointments";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";
import PatientList from "./components/PatientList";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token) {
      localStorage.setItem("authToken", token);
    }
    if (user) {
      localStorage.setItem("authUser", user);
    }
    if (token || user) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className="flex-grow-1"
          style={{
            backgroundColor: "#F8F9FD",
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />

            <Route
              path="/appointments"
              element={<Appointments />}
            />

            <Route
              path="/add-doctor"
              element={<AddDoctor />}
            />

            <Route
              path="/doctor-list"
              element={<DoctorList />}
            />

            <Route
              path="/patient-list"
              element={<PatientList />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;