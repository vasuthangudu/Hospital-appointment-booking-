import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function ContactUs() {
  return (
    <div>
      <NavBar/>
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">CONTACT US</h2>

      <div className="row align-items-center justify-content-center">
        {/* Image Section */}
        <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0">
          <img
            src="/images/contact_image.png"
            alt="Doctor Office"
            className="img-fluid rounded"
          />
        </div>

        {/* Text Section */}
        <div className="col-12 col-md-6 col-lg-4">
          <h5 className="fw-bold mb-3">OUR OFFICE</h5>
          <p className="text-muted">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-muted">
            Tel: (415) 555-0132 <br />
            Email: greatstackdev@gmail.com
          </p>

          <h5 className="fw-bold mt-4 mb-3">CAREERS AT PRESCRIPTO</h5>
          <p className="text-muted">Learn more about our teams and job openings.</p>
          <button className="btn btn-outline-dark px-4 py-2">Explore Jobs</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ContactUs;