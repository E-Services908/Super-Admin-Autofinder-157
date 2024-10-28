import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
// import Home from "./components/Home";
// import About from "./components/About";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div className="Navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Super_Admin_Login">Super Admin</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
          {/* <li>
            <Link to="/signup">Sign up</Link>
          </li> */}
          <li>
            <Link to="/Only_CarInspection_Login">Car Inspection</Link>
          </li>
          {/* <li>
            <Link to="/Only_ManageAds_Login">Manage Ads By Autofinder</Link>
          </li> */}
          <br />
          <br />
          {localStorage.getItem("isLoggedIn") ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
