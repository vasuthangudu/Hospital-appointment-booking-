import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Use state to manage the menu collapse
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <style>{`
        .nav-link { font-weight: 500; transition: color 0.3s; cursor: pointer; }
        .nav-link:hover { color: #5f6fff !important; }
        .btn-link-white { text-decoration: none; color: white !important; }
        
        @media (max-width: 991px) {
          .navbar-collapse {
            background: white;
            padding: 15px;
            border-top: 1px solid #eee;
            margin-top: 10px;
            display: ${isOpen ? 'block' : 'none'}; /* Toggle visibility */
          }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold text-primary fs-3">Prescripto</Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="menu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" onClick={closeMenu}>
              <li className="nav-item px-2"><Link to="/" className="nav-link">HOME</Link></li>
              <li className="nav-item px-2"><Link to="/doctors" className="nav-link">ALL DOCTORS</Link></li>
              <li className="nav-item px-2"><Link to="/about" className="nav-link">ABOUT</Link></li>
              <li className="nav-item px-2"><Link to="/contact" className="nav-link">CONTACT</Link></li>
            </ul>
            
            <div className="d-flex px-2" onClick={closeMenu}>
              <button className="btn btn-primary rounded-pill px-4">
                <Link to="/create-account" className="btn-link-white">Create Account</Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;