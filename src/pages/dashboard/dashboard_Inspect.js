import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminNavbar/adminNavbar_Inspect";
import "./dashboard.css";

const adminDashboard_Inspect = () => {
  // Main Body
  return (
    <div className="AdminDashboard">
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      <div className="contentHolder">
        <br />
        <br />
        <h1>Welcome</h1>
        <br />
        <br />
        <h1>Car Inspection Dashboard Only</h1>
        <br />
        <br />
        <hr />
      </div>
    </div>
  );
};

export default adminDashboard_Inspect;
