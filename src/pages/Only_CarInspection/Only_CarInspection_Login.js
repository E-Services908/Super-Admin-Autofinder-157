import { useState } from "react";
import axios from "axios";
import "./Only_CarInspection_Login.css";
import logo from "../../assets/logo1.png";
import Inspection_Car from "../../assets/inspectionCar.png";
import { useNavigate, Link } from "react-router-dom";

const Only_CarInspection_Login = () => {
  // Navigate
  const navigate = useNavigate();
  // Login
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
  });

  const handleChangeSignupForm = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if(loginPhoneNumber === "03335448744" && loginPassword === "Pass@000"){
        localStorage.setItem('isLoggedIn', true);
        navigate("/Dashboard_Inspect")
      }
  };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         "https://autofinder-backend.vercel.app/api/user/login",
//         { phoneNumber: loginPhoneNumber, password: loginPassword }
//       );
//       if (response.data.success) {
//         // Assuming the response contains a 'success' field
//         window.location.href = "/home"; // Navigate to home
//       } else {
//         alert("Incorrect password"); // Show alert if password is incorrect
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please try again."); // General error handling
//     }
//   };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/signup",
        signupForm
      );
      if (response.data.success) {
        // Assuming the response contains a 'success' field
        alert("User Successfully Sign Up"); // Show success alert
        window.location.href = "/home"; // Navigate to home
      } else if (response.data.error === "User already exists") {
        alert("User Already Exist"); // Show alert if user already exists
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again."); // General error handling
    }
  };

  return (
    <div id="Navbar_Container">
      <div id="Box_Parent">
        <div id="Box">
          {/* Image */}
          <div id="Car_Inspection_Img">
            <img src={Inspection_Car} alt="Car Inspection" />
          </div>
          {/* Heading */}
          <h2 id="Car_Inspection_H2">Only For Car Inspection</h2>
          {/* Button */}
          <button id="Car_Inspection_Btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>

        {/* --- Login Box --- */}
        {showLogin && (
          <div className="modalFormDiv_Parent">
            <h2>Login</h2>
            <div className="modalFormDiv">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                onChange={(e) => setLoginPhoneNumber(e.target.value)}
                value={loginPhoneNumber}
              />
            </div>
            <div className="modalFormDiv">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
              />
            </div>
            <button onClick={handleLogin}>Login Here</button>
            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        )}

        {/* --- Sign Up Box --- */}
        {showSignup && (
          <div className="modalFormDiv_Parent">
            <h2>Sign Up</h2>
            <div className="modalFormDiv">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                onChange={handleChangeSignupForm}
                value={signupForm.name}
              />
            </div>
            <div className="modalFormDiv">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleChangeSignupForm}
                value={signupForm.email}
              />
            </div>
            <div className="modalFormDiv">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                onChange={handleChangeSignupForm}
                value={signupForm.phoneNumber}
              />
            </div>
            <div className="modalFormDiv">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChangeSignupForm}
                value={signupForm.password}
              />
            </div>
            <div className="modalFormDiv">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address"
                onChange={handleChangeSignupForm}
                value={signupForm.address}
              />
            </div>
            <button onClick={handleSignup}>Sign Up</button>
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  setShowLogin(true);
                  setShowSignup(false);
                }}
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Only_CarInspection_Login;
