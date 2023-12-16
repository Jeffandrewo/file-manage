import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login, Register, HomePage, DashboardPage, Reset } from "./pages";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </div>
  );
};

export default App;
