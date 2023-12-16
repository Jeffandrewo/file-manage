import React from "react";
import RegisterForm from "../../../components/AuthComponents/RegisterForm";
import { Link } from "react-router-dom";
import AuthNavbar from "../../../components/AuthComponents/AuthNavbar";

const Register = () => {
  return (
    <div>
      <AuthNavbar />
      <div className="container-fluid">
        <h1
          className="display-5 text-center"
          style={{ fontWeight: "600", marginTop: "150px" }}
        >
          Get Started
        </h1>
        <div className="row">
          <div className="col-md-3 mx-auto mt-5">
            <RegisterForm />
            <Link className="text-dark d-block text-center mt-3" to="/login">
              Already a member? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
