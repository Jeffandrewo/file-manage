import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../../redux/actionCreators/authActionCreator";
import { deleteAccountUser } from "../../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css";

const NavigationComponent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false); // State to manage modal visibility
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleWelcomeClick = () => {
    // Open the welcome modal when "Welcome" text is clicked
    setIsWelcomeModalOpen(true);
  };
  
  const closeWelcomeModal = () => {
    // Close the welcome modal
    setIsWelcomeModalOpen(false);
  };

  const handleFileUploadClick = () => {
    // Open the file upload modal
    setIsFileUploadModalOpen(true);
  };

  const closeFileUploadModal = () => {
    // Close the file upload modal
    setIsFileUploadModalOpen(false);
    // Clear the selected file when modal is closed
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log("File submitted:", file);
    // Add your file upload logic (e.g., API call, dispatching actions, etc.)
    // Close the modal after handling the file
    closeFileUploadModal();
  };

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
                <p
                  className="my-0 mt-2 mx-2 welcome-text"
                  onClick={handleWelcomeClick}
                >
                  <span className="text-dark">Welcome, </span>
                  <span className="fw-bold">{user.displayName}</span>
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
  
      {isWelcomeModalOpen && (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100 welcome-modal">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 mt-5 bg-white rounded p-4">
              <div className="d-flex justify-content-between">
                <h4>Account Details:</h4>
                <button className="btn" onClick={closeWelcomeModal}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-black"
                    size="sm"
                  />
                </button>
              </div>
              <hr />
              <div className="d-flex flex-column align-items-center">
                <p>{`Username: ${user.displayName}`}</p>
                <p>{`Email: ${user.email}`}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationComponent;
