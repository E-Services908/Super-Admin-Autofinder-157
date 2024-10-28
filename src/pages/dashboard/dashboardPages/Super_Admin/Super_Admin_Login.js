import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./super_admin_login.css";
import logo from "../../../../assets/logo1.png";
import Inspection_Car from "../../../../assets/super_Admin.png";
import { useNavigate, Link } from "react-router-dom";

const Super_Admin_Login = () => {
  // UserContext
  // const { dispatch } = useContext(UserContext);
  // Navigate
  const navigate = useNavigate();
  // Previous Box Logic
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // --- Login & SignUp ---
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const loginValidation = () => {
    if (loginPhoneNumber === "" || loginPassword === "") return false;
    else return true;
  };

  const emptyLoginFields = () => {
    setLoginPhoneNumber("");
    setLoginPassword("");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (!loginValidation()) {
  //     setLoginError("Please enter your email and password.");
  //     return;
  //   }

  //   setDisableBtn(true);

  //   try {
  //     const response = await axios.post(
  //       "https://autofinder-backend.vercel.app/api/user/login",
  //       { phoneNumber: loginPhoneNumber, password: loginPassword }
  //     );

  //     if (response.data.ok) {
  //       localStorage.setItem("token", response.data.token);
  //       setLoginError("");
  //       setDisableBtn(false);
  //       emptyLoginFields();
  //       console.log(response.data);
  //       // localStorage.setItem('isLoggedIn', true);
  //       // navigate("/Dashboard_Inspect")
  //       localStorage.setItem("isLoggedIn", true);
  //       localStorage.setItem("userId", response.data.user._id); // Store the user ID
  //       navigate("/Dashboard_Inspect", {
  //         state: { userId: response.data.user._id },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.error);
  //     setLoginError(error.response.data.error);
  //     setDisableBtn(false);
  //     emptyLoginFields();
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginValidation()) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setDisableBtn(true);

    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/login",
        { phoneNumber: loginPhoneNumber, password: loginPassword }
      );

      console.log("API Response:", response.data);

      if (response && response.data && response.data.ok) {
        const user = response.data.data; // Assuming user data is in the `data` field
        const userType = user?.userType;

        if (userType === "Super_Admin") {
          const userId = user?._id;
          const userName = user?.name;

          if (userId) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userId", userId); // Store the user ID
            localStorage.setItem("userName", userName); // Store the user ID
            setLoginError("");
            emptyLoginFields();
            // Navigate
            navigate("/Dashboard_Super", {
              state: { userId, userName },
            });
          } else {
            console.error("User ID is missing in the response data.");
            setLoginError("User ID is missing. Please try again later.");
          }
        } else {
          alert("This user is not allowed to login access.");
          setLoginError("This user is not allowed to login access.");
        }
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(
        error.response?.data?.error || "An error occurred during login."
      );
    } finally {
      setDisableBtn(false);
    }
  };

  const handleChangeSignupForm = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const signupValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^03\d{9}$/;

    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.phoneNumber ||
      !signupForm.password ||
      !signupForm.address
    ) {
      setSignupError("Please Fill All The Fields");
      return false;
    }

    if (signupForm.name.length < 3) {
      setSignupError("Name should be minimum of 3 characters long");
      return false;
    }

    if (!emailPattern.test(signupForm.email)) {
      setSignupError("Please enter a valid email address");
      return false;
    }

    if (signupForm.address.length < 3) {
      setSignupError("Address should be minimum of 3 characters long");
      return false;
    }

    if (!phonePattern.test(signupForm.phoneNumber)) {
      setSignupError("Phone number should be in the format 03xxxxxxxxx");
      return false;
    }

    if (
      signupForm.password.length < 8 ||
      !/\d/.test(signupForm.password) ||
      !/[a-zA-Z]/.test(signupForm.password)
    ) {
      setSignupError(
        "Password should be minimum of 8 characters and should include text and at least one number"
      );
      return false;
    }

    return true;
  };

  const emptySignupFields = () => {
    setSignupForm({
      name: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
    });
  };

  const handleSignup = async () => {
    if (!signupValidation()) {
      return;
    }

    // Construct the signup data with the desired structure
    const signupData = {
      name: signupForm.name,
      password: signupForm.password, // Ensure this is securely hashed on the server-side
      email: signupForm.email,
      phoneNumber: signupForm.phoneNumber,
      address: signupForm.address,
      userType: "Super_Admin", // Explicitly set the userType to "Inspector"
      isDeleted: false, // Default value
      package: "", // Empty value for package
      boosterPackUsed: null, // Empty value for booster pack usage
      favoriteAds: [], // Empty array for favorite ads
    };

    try {
      setDisableBtn(true);
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/signup",
        signupData
      );

      if (response.data.ok) {
        setDisableBtn(false);
        setSignupError("");
        emptySignupFields();
      } else {
        // Handle unexpected response
        setSignupError("Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setDisableBtn(false);
      setSignupError(
        error.response?.data?.error || "An error occurred during signup."
      );
    }
  };

  // --- Login & SignUp ---
  // Main Body
  return (
    <div id="Navbar_Container">
      <div id="Box_Parent">
        <div id="Box">
          {/* Image */}
          <div id="Car_Inspection_Img">
            <img src={Inspection_Car} alt="Car Inspection" />
          </div>
          {/* Heading */}
          <h2 id="Car_Inspection_H2">Super Admin</h2>
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
            {/* <p>
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
            </p> */}
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

export default Super_Admin_Login;

