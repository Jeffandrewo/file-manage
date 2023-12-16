import React from "react";
import AuthNavbar from "../../../components/AuthComponents/AuthNavbar";
import ResetForm from "../../../components/AuthComponents/ResetForm";

const Reset = () => {
  return (
    <>
      <AuthNavbar />
      <div className="container">
        <h1
          className="display-5 text-center"
          style={{ fontWeight: "600", marginTop: "200px" }}
        >
          Reset Password
        </h1>
        <div className="row">
          <div className="col-md-4 mx-auto mt-5">
            <ResetForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
