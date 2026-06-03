import React, { useEffect, useState } from "react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const savedDoctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    setDoctors(savedDoctors);
  }, []);

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#F8F9FD",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Doctor List</h4>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Doctor Name</th>
                <th>Email</th>
                <th>Speciality</th>
                <th>Experience</th>
                <th>Fees</th>
              </tr>
            </thead>

            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4"
                  >
                    No Doctors Added
                  </td>
                </tr>
              ) : (
                doctors.map((doctor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="/images/profile.svg"
                          alt=""
                          width="40"
                          height="40"
                          className="rounded-circle me-2"
                        />
                        {doctor.name}
                      </div>
                    </td>

                    <td>{doctor.email}</td>
                    <td>{doctor.speciality}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.fees}</td>
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

export default DoctorList;