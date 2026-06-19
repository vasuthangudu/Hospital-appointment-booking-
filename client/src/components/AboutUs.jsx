import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import NavBar from "./NavBar";


function AboutUs() {
  return (
    <div>
      <NavBar/>
    <div className="container py-5">
     
     
      {/* Top Section: Image and Intro */}
      <div className="row align-items-center mb-5">
        <div className="col-12 col-lg-5 mb-4 mb-lg-0">
          <img 
            src="/images/about_image.png" 
            alt="Doctors" 
            className="img-fluid rounded" 
          />
        </div>
        <div className="col-12 col-lg-7">
          <p>Welcome To Prescripto, Your Trusted Partner In Managing Your Healthcare Needs...</p>
          <h5 className="fw-bold mt-4">Our Vision</h5>
          <p>Our Vision At Prescripto Is To Create A Seamless Healthcare Experience...</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <h4 className="fw-bold mb-4">WHY <span className="text-primary">CHOOSE US</span></h4>
      <div className="row g-3">
        {[
          { title: "EFFICIENCY", text: "Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle." },
          { title: "CONVENIENCE", text: "Access To A Network Of Trusted Healthcare Professionals In Your Area." },
          { title: "PERSONALIZATION", text: "Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health." }
        ].map((item, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="card h-100 p-4 border shadow-sm">
              <h5 className="fw-bold">{item.title}:</h5>
              <p className="text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
     
     
    </div>
    <Footer/>
    </div>
    
  );
}
export default AboutUs;