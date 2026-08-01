import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get logged-in user data from localStorage
    const authUser = localStorage.getItem("authUser");
    
    if (!authUser) {
      // If no user logged in, redirect to login
      navigate("/");
      return;
    }

    try {
      const userData = JSON.parse(authUser);
      setUser(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container py-5 text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <NavBar />
        <div className="container py-5 text-center">
          <p className="text-danger">No user found. Please login first.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <NavBar/>
  
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          
          {/* Profile Header */}
          <div className="d-flex align-items-center mb-4">
            <img 
              src="/images/profile_pic.png" 
              alt="Profile" 
              className="rounded-circle img-fluid" 
              style={{ width: "120px", height: "120px", objectFit: "cover", backgroundColor: "#e9ecef" }}
            />
            <div className="ms-4">
              <h3 className="fw-bold">{user.fullName || "User"}</h3>
              <p className="text-muted mb-0">Patient</p>
            </div>
          </div>

          <hr />

          {/* Contact Information */}
          <h5 className="text-uppercase text-muted mb-3">Contact Information</h5>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Email id:</div>
            <div className="col-8 col-md-9 text-primary">{user.email || "N/A"}</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Phone:</div>
            <div className="col-8 col-md-9 text-primary">{user.phone || "Not provided"}</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Address:</div>
            <div className="col-8 col-md-9 text-muted">{user.address || "Not provided"}</div>
          </div>

          {/* Basic Information */}
          <h5 className="text-uppercase text-muted mb-3">Basic Information</h5>
          <div className="row mb-3">
            <div className="col-4 col-md-3 fw-bold">Gender:</div>
            <div className="col-8 col-md-9">{user.gender || "Not provided"}</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Birthday:</div>
            <div className="col-8 col-md-9">{user.dateOfBirth || "Not provided"}</div>
          </div>

          {/* Buttons */}
          <div className="mt-4">
            <button className="btn btn-outline-primary px-4 me-3">Edit</button>
            <button className="btn btn-primary px-4">Save information</button>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}

export default MyProfile;