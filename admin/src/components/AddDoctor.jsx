import React, { useState } from "react";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    education: "",
    experience: "",
    fees: "",
    address1: "",
    address2: "",
    about: "",
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoctor = () => {
    if (!doctor.name || !doctor.email) {
      alert("Please fill required fields");
      return;
    }

    const doctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    doctors.push(doctor);

    localStorage.setItem(
      "doctors",
      JSON.stringify(doctors)
    );

    alert("Doctor Added Successfully");

    setDoctor({
      name: "",
      email: "",
      password: "",
      speciality: "",
      education: "",
      experience: "",
      fees: "",
      address1: "",
      address2: "",
      about: "",
    });
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#F8F9FD",
        minHeight: "100vh",
      }}
    >
      <h5 className="mb-4">Add Doctor</h5>

      <div className="card border-0 shadow-sm p-4">

        <div className="row">

          <div className="col-md-6">

            <label className="form-label">
              Doctor Name
            </label>

            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Name"
            />

            <label className="form-label">
              Doctor Email
            </label>

            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Email"
            />

            <label className="form-label">
              Doctor Password
            </label>

            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Password"
            />

            <label className="form-label">
              Experience
            </label>

            <input
              type="text"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Experience"
            />

            <label className="form-label">
              Fees
            </label>

            <input
              type="text"
              name="fees"
              value={doctor.fees}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Fees"
            />

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Speciality
            </label>

            <input
              type="text"
              name="speciality"
              value={doctor.speciality}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Speciality"
            />

            <label className="form-label">
              Education
            </label>

            <input
              type="text"
              name="education"
              value={doctor.education}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Education"
            />

            <label className="form-label">
              Address 1
            </label>

            <input
              type="text"
              name="address1"
              value={doctor.address1}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Address 1"
            />

            <label className="form-label">
              Address 2
            </label>

            <input
              type="text"
              name="address2"
              value={doctor.address2}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Address 2"
            />

          </div>

        </div>

        <label className="form-label">
          About Me
        </label>

        <textarea
          rows="5"
          name="about"
          value={doctor.about}
          onChange={handleChange}
          className="form-control"
          placeholder="Write about yourself"
        />

        <button
          className="btn btn-primary mt-4"
          onClick={handleAddDoctor}
        >
          Add Doctor
        </button>

      </div>
    </div>
  );
};

export default AddDoctor;