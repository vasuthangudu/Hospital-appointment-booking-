import React, { useState } from "react";
import axios from "axios";

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

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
        alert("Please upload a valid image file (jpeg, png, gif, webp)");
        return;
      }

      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDoctor = async () => {
    try {
      if (
        !doctor.name ||
        !doctor.email ||
        !doctor.password ||
        !doctor.speciality
      ) {
        alert("Please fill all required fields");
        return;
      }

      setLoading(true);

      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("name", doctor.name);
      formData.append("email", doctor.email);
      formData.append("password", doctor.password);
      formData.append("experience", Number(doctor.experience));
      formData.append("fee", Number(doctor.fees));
      formData.append("speciality", doctor.speciality);
      formData.append("education", doctor.education);
      formData.append("address", `${doctor.address1}, ${doctor.address2}`);
      formData.append("about", doctor.about);
      
      // Add image if selected
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/doctors/add-doctor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
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
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to Add Doctor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#F8F9FD",
        minHeight: "100vh",
      }}
    >
      <h4 className="mb-4">Add Doctor</h4>

      <div className="card shadow-sm border-0 p-4">
        {/* Image Preview Section */}
        <div className="mb-4">
          <div className="row">
            <div className="col-md-3 text-center">
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "2px solid #007bff",
                    }}
                  />
                  <p className="mt-2 text-muted">Image Preview</p>
                </div>
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    backgroundColor: "#e9ecef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    border: "2px dashed #ccc",
                  }}
                >
                  <span className="text-muted">No Image</span>
                </div>
              )}
            </div>
            <div className="col-md-9">
              <label className="form-label">
                Doctor Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mb-3"
              />
              <small className="text-muted">
                Accepted formats: JPEG, PNG, GIF, WebP (Max 5MB)
              </small>
            </div>
          </div>
        </div>

        <hr />

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
              placeholder="Enter Doctor Name"
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
              placeholder="Enter Email"
            />

            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Enter Password"
            />

            <label className="form-label">
              Experience
            </label>
            <input
              type="number"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Years of Experience"
            />

            <label className="form-label">
              Consultation Fee
            </label>
            <input
              type="number"
              name="fees"
              value={doctor.fees}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Fee"
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
              Address Line 1
            </label>
            <input
              type="text"
              name="address1"
              value={doctor.address1}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Address Line 1"
            />

            <label className="form-label">
              Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              value={doctor.address2}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Address Line 2"
            />
          </div>
        </div>

        <label className="form-label">
          About Doctor
        </label>

        <textarea
          rows="5"
          name="about"
          value={doctor.about}
          onChange={handleChange}
          className="form-control"
          placeholder="Write about doctor..."
        />

        <button
          className="btn btn-primary mt-4"
          onClick={handleAddDoctor}
          disabled={loading}
        >
          {loading ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;