import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    const clientUrl = process.env.REACT_APP_CLIENT_URL || "http://localhost:3000";
    window.location.href = `${clientUrl}/create-account`;
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white border-bottom px-4"
      style={{ height: "70px" }}
    >
      <div className="container-fluid">

        <div className="d-flex align-items-center">
          <h3 className="fw-bold text-primary mb-0">
            Prescripto
          </h3>

          <span className="badge border text-dark ms-2">
            Admin
          </span>
        </div>

        <button className="btn btn-primary rounded-pill px-4" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;