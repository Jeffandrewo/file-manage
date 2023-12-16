import React from "react";
import { resetPasswordUser } from "../../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetForm = () => {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill in all fields");
      return;
    } else {
      dispatch(resetPasswordUser(email, setSuccess));
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto mt-5">
            <form autoComplete="off">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  aria-describedby="emailHelp"
                  style={{ borderColor: "black", boxShadow: "none" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  id="emailHelp"
                  className="text-grey d-flex text-center mt-2 justify-content-center align-items-center "
                >
                  We'll send you a link to reset your password.
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark my-2 form-control"
                onClick={handleSubmit}
              >
                Send Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetForm;
