import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        /* Remove default link underline */
        .footer-link { text-decoration: none; color: #6c757d; transition: 0.3s; }
        .footer-link:hover { color: #5f6fff; }

        @media (max-width: 767px) {
          .footer-content { text-align: center; }
          .footer-logo { margin: 0 auto; }
          .w-75 { width: 100% !important; }
        }
      `}</style>

      <footer className="bg-white py-5 mt-5 border-top">
        <div className="container">
          <div className="row g-4 footer-content">
            {/* Logo and Description */}
            <div className="col-md-6">
              <h3 className="text-primary fw-bold mb-3">Prescripto</h3>
              <p className="text-muted small w-75">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* Company Links */}
            <div className="col-md-3">
              <h5 className="fs-6 fw-bold mb-3">COMPANY</h5>
              <ul className="list-unstyled text-muted small lh-lg mb-0">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-3">
              <h5 className="fs-6 fw-bold mb-3">GET IN TOUCH</h5>
              <ul className="list-unstyled text-muted small lh-lg mb-0">
                <li>+91 7013849476</li>
                <li>+91 9347893134</li>
                <li>manikantaseeramreddi@gmail.com</li>
              </ul>
            </div>
          </div>

          <hr className="my-4" />
          <p className="text-center text-muted small mb-0">
            Copyright © 2026 All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;