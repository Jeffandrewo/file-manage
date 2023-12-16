import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const AuthNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm">
      <div className="container-fluid">
        <Link
          className="navbar-brand ms-5 d-flex ms-auto me-auto align-items-center justify-content-center" // Add justify-content-center class
          to="/"
        >
          <img src={Logo} alt="FileFolio" style={{ width: "40px" }} />
          <span className="fw-bold">File</span>Folio
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
