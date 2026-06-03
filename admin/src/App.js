import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar/Navbar";
import Sidebar from "./layout/Sidebar/Sidebar";

import Main from "./components/Main";
import Appointments from "./components/Appointments";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";
import PatientList from "./components/PatientList";

function App() {
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