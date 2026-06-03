import React, { useEffect, useState } from "react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const savedPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    setPatients(savedPatients);
  }, []);

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#F8F9FD",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Patient List</h4>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0">

            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>

              {patients.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Patients Found
                  </td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientList;