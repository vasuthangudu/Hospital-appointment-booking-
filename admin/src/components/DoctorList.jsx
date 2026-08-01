import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/doctors/all-doctors`
      );

      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/doctors/delete-doctor/${id}`
      );

      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== id)
      );

      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="card shadow border-0">
        <div className="card-header bg-white">
          <h3 className="mb-0">Doctors List</h3>
        </div>

        <div className="card-body">
          {loading ? (
            <h5 className="text-center">Loading...</h5>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Speciality</th>
                    <th>Experience</th>
                    <th>Fee</th>
                    <th>Education</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                      <tr key={doctor._id}>
                        <td>{index + 1}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.speciality}</td>
                        <td>{doctor.experience} Years</td>
                        <td>₹{doctor.fee}</td>
                        <td>{doctor.education}</td>
                        <td>{doctor.address}</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(doctor._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No Doctors Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;