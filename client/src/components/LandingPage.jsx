import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

function LandingPage() {
  const specialities = [
    "General Physician", "Gynecologist", "Dermatologist", 
    "Pediatrician", "Neurologist", "Gastroenterologist",
  ];

  const mainAssets = {
    heroImage: "/images/doc-header-img.png",
    bannerImage: "/images/doctor.png"
  };

  const doctors = [
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/james.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/1.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/2.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/3.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/4.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/james.png" },
  ];

  return (
    <>
      <style>{`
        body { background:#f8f9fa; font-family: 'Poppins', sans-serif; }
        .hero { background:#5f6fff; border-radius:20px; min-height:400px; display:flex; align-items:center; }
        .banner { background:#5f6fff; border-radius:20px; }
        .doctor-card { transition:.3s; cursor:pointer; border-radius:15px; overflow:hidden; }
        .doctor-card:hover { transform:translateY(-10px); box-shadow:0 15px 25px rgba(0,0,0,.15); }
        .speciality-box { transition:.3s; cursor:pointer; }
        .speciality-box:hover { transform:translateY(-8px); }
        .speciality-circle { width:90px; height:90px; border-radius:50%; background:#dce4ff; display:flex; align-items:center; justify-content:center; margin:auto; font-size:40px; }
        .doctor-img-container { width: 100%; height: 240px; overflow: hidden; }
        .doctor-img-container img { width: 100%; height: 100%; object-fit: cover; }
        /* Fix for Link-as-button */
        .btn-link-custom { text-decoration: none; color: inherit; display: block; }
        @media(max-width:768px){
          .hero { text-align:center; padding:30px 15px !important; min-height:auto; }
          .banner { text-align:center; padding:30px 15px !important; }
        }
      `}</style>

      <NavBar />

      {/* Hero */}
      <div className="container my-4">
        <div className="hero p-4 p-lg-5">
          <div className="row align-items-center w-100 mx-0">
            <div className="col-lg-6 text-white">
              <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>Book Appointment<br />With Trusted Doctors</h1>
              <p className="mb-4 small">Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.</p>
              {/* Corrected: Link acts as the button */}
              <Link to="/appointment" className="btn btn-light rounded-pill px-3 py-2 small fw-semibold text-primary">
                Book Appointment →
              </Link>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img src={mainAssets.heroImage} className="img-fluid rounded" alt="Doctors Group" style={{ maxHeight: "320px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Speciality Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold">Find by Speciality</h2>
          <p className="text-muted">Browse trusted doctors by category</p>
          <div className="row mt-5">
            {specialities.map((item, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-2 mb-4 speciality-box">
                <div className="speciality-circle">👨‍⚕️</div>
                <p className="mt-3 small fw-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="pb-5">
        <div className="container">
          <h2 className="fw-bold text-center">Top Doctors to Book</h2>
          <div className="row g-4 mt-4">
            {doctors.map((doctor, index) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={index}>
                <div className="card doctor-card h-100 border-0 shadow-sm">
                  <div className="doctor-img-container">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="card-body p-3">
                    <small className="text-success d-block mb-1" style={{ fontSize: "0.75rem" }}>● Available</small>
                    <h6 className="card-title fw-bold mb-0 fs-6">{doctor.name}</h6>
                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>{doctor.speciality}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-4">
        <div className="container">
          <div className="banner p-4 p-lg-5 text-white">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="fw-bold mb-1 h3">Book Appointment</h2>
                <h2 className="fw-bold mb-4 h3">With 100+ Trusted Doctors</h2>
                <Link to="/create-account" className="btn btn-light rounded-pill px-4 py-2 text-primary fw-semibold small">
                  Create Account
                </Link>
              </div>
              <div className="col-lg-6 text-center">
                <img src={mainAssets.bannerImage} className="img-fluid rounded" alt="App Preview" style={{ maxHeight: "300px" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;