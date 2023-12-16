import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../../redux/actionCreators/authActionCreator";
import { deleteAccountUser } from "../../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";

const NavigationComponent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start ",
      });
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm">
      <Link className="navbar-brand ms-5 d-flex align-items-center" to="/">
        <img src={Logo} alt="FileFolio" style={{ width: "40px" }} />
        <span className="fw-bold">File</span>Folio
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
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
                <Link className="nav-link" to="/">
                  Home
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
                  onClick={() => scrollToSection("overview")}
                >
                  Overview
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link"
                  onClick={() => scrollToSection("features")}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link"
                  onClick={() => scrollToSection("contact-us")}
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
