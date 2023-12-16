import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../redux/actionCreators/authActionCreator";
import { deleteAccountUser } from "../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";

const NavigationComponent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm fixed-top">
      <Link
        className="navbar-brand ms-5 d-flex align-items-center"
        to="/"
        onClick={() => handleScrollToSection("home-section")}
      >
        <img src={Logo} alt="FileFolio" style={{ width: "40px" }} />
        <span className="fw-bold">File</span>Folio
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-5">
          {isAuthenticated ? (
            <>
              <li className="nav-item mx-3">
                <p className="my-0 mt-2 mx-2">
                  <span className="text-dark">Welcome, </span>
                  <span className="text-primary fw-bold">
                    {user.displayName}
                  </span>
                </p>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mx-3 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => dispatch(SignOutUser())}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => dispatch(deleteAccountUser(setSuccess))}
                    >
                      Delete Account
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link"
                  onClick={() => handleScrollToSection("overview-section")}
                >
                  Overview
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link"
                  onClick={() => handleScrollToSection("features-section")}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link"
                  onClick={() => handleScrollToSection("contact-us-section")}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link fw-bold" to="/register">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationComponent;
