import React from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/actionCreators/authActionCreator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signUpUser(name, email, password, setSuccess));
  };

  React.useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ borderColor: "black", boxShadow: "none" }}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderColor: "black", boxShadow: "none" }}
        />
      </div>
      <div className="form-group my-2">
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: "black", boxShadow: "none" }}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="passwordConfirmation"
            className="form-control"
            placeholder="Re-type password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            style={{ borderColor: "black", boxShadow: "none" }}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={toggleShowPassword}
              style={{ borderColor: "black", borderRadius: "0 5px 5px 0" }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-dark my-2 form-control">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
