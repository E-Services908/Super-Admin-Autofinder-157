import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../../../components/adminNavbar/adminNavbar_Super";

const Admin_Add_User = () => {
  // --- Sign Up Logic ---
  // Previous Box Logic
  const [disableBtn, setDisableBtn] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

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
      userType: "Admin_User",
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
        alert(" Succesfully Create Admin User ");
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
  // Main Body
  return (
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      {/* Main Body */}
      <div className="contentHolder">
        <br />
        <h1>Add Admin User</h1>
        <br />
        <hr />
        <br />
        <br />
        {/* Main Body */}
        {/* --- Sign Up Body --- */}
        <div className="modalFormDiv_Parent" style={{ width: "50%", margin: "0em auto", }}>
          <h2>Create New Account For Admin User</h2>
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
        </div>
        {/* --- Sign Up Body --- */}
      </div>
    </div>
  );
};

export default Admin_Add_User;
