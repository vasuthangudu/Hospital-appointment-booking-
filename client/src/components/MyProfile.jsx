import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

function MyProfile() {
  return (
    <div>
      <NavBar/>
  
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          
          {/* Profile Header */}
          <div className="d-flex align-items-center mb-4">
            <img 
              src="/imgaes/profile_pic.png" 
              alt="Profile" 
              className="rounded-circle img-fluid" 
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <div className="ms-4">
              <h3 className="fw-bold">Edward Vincent</h3>
            </div>
          </div>

          <hr />

          {/* Contact Information */}
          <h5 className="text-uppercase text-muted mb-3">Contact Information</h5>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Email id:</div>
            <div className="col-8 col-md-9 text-primary">richardjameswap@gmail.com</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Phone:</div>
            <div className="col-8 col-md-9 text-primary">+1 123 456 7890</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Address:</div>
            <div className="col-8 col-md-9 text-muted">57th Cross, Richmond Circle,<br />Church Road, London</div>
          </div>

          {/* Basic Information */}
          <h5 className="text-uppercase text-muted mb-3">Basic Information</h5>
          <div className="row mb-3">
            <div className="col-4 col-md-3 fw-bold">Gender:</div>
            <div className="col-8 col-md-9">Male</div>
          </div>
          <div className="row mb-4">
            <div className="col-4 col-md-3 fw-bold">Birthday:</div>
            <div className="col-8 col-md-9">20 July, 2024</div>
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