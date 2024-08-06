import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [cnic, setCnic] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, cnic, pnumber, city, email, password);
  };
  return (
    <div className="Signup">
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Fname">Full Name</label>
        <input type="text" onChange={(e) => setFname(e.target.value)} />

        <label>CNIC</label>
        <input type="text" onChange={(e) => setCnic(e.target.value)} />

        <label>Phone Number</label>
        <input type="number" onChange={(e) => setPnumber(e.target.value)} />

        <label>City</label>
        <input type="text" onChange={(e) => setCity(e.target.value)} />

        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
