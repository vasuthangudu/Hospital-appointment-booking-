import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function AllDoctors() {
  const specialities = ["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"];
  
  const doctors = [
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/1.png" },
    { name: "Dr. Emily Smith", speciality: "Gynecologist", image: "/images/2.png" },
    { name: "Dr. John Doe", speciality: "Dermatologist", image: "/images/3.png" },
    { name: "Dr. Sarah Connor", speciality: "Pediatrician", image: "/images/4.png" },
    { name: "Dr. Alan Grant", speciality: "Neurologist", image: "/images/5.png" },
    { name: "Dr. Ellie Sattler", speciality: "Gastroenterologist", image: "/images/6.png" },
    { name: "Dr. Richard James", speciality: "General Physician", image: "/images/7.png" },
    { name: "Dr. Emily Smith", speciality: "Gynecologist", image: "/images/8.png" },
    { name: "Dr. John Doe", speciality: "Dermatologist", image: "/images/9.png" },
    { name: "Dr. Sarah Connor", speciality: "Pediatrician", image: "/images/10.png" },
    { name: "Dr. Alan Grant", speciality: "Neurologist", image: "/images/11.png" },
    { name: "Dr. Ellie Sattler", speciality: "Gastroenterologist", image: "/images/12.png" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      
      <div className="container mt-4 flex-grow-1">
        <p className="text-muted">Browse through the doctors specialist.</p>
        
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3 col-lg-2 mb-4">
            <div className="d-flex flex-column gap-2">
              {specialities.map((item) => (
                <button key={item} className="btn btn-outline-primary text-start w-100 py-2">
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Grid */}
          <div className="col-12 col-md-9 col-lg-10">
            <div className="row g-4">
              {doctors.map((doctor, index) => (
                <div key={index} className="col-6 col-sm-6 col-lg-4 col-xl-3">
                  <div className="card h-100 shadow-sm border-0 transition-card">
                    {/* Increased Image Container Height */}
                    <div style={{ height: "260px", overflow: "hidden", borderRadius: "10px 10px 0 0" }}>
                      <img 
                        src={doctor.image} 
                        className="card-img-top h-100 w-100" 
                        alt={doctor.name} 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                    {/* Increased Card Body Padding */}
                    <div className="card-body p-4">
                      <small className="text-success d-flex align-items-center mb-2" style={{ fontSize: "0.8rem" }}>
                        <span className="me-1">●</span> Available
                      </small>
                      <h5 className="card-title fw-bold mb-1">{doctor.name}</h5>
                      <p className="text-muted mb-0">{doctor.speciality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style>{`
        .transition-card { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .transition-card:hover { transform: translateY(-10px); box-shadow: 0 20px 30px rgba(0,0,0,0.1) !important; }
        
        @media (max-width: 576px) {
            .btn { font-size: 0.85rem; padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
}

export default AllDoctors;