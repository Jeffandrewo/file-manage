import React from "react";
import LoginForm from "../../../components/AuthComponents/LoginForm";
import { Link } from "react-router-dom";
import AuthNavbar from "../../../components/AuthComponents/AuthNavbar";

const Login = () => {
  return (
    <div>
      <AuthNavbar />
      <div className="container">
        <h1
          className="display-5 text-center"
          style={{ fontWeight: "600", marginTop: "200px" }}
        >
          Log In
        </h1>
        <div className="row">
          <div className="col-md-4 mx-auto mt-5">
            <LoginForm />
            <Link className="text-dark d-block text-center mt-3" to="/register">
              Not a member? Register here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
