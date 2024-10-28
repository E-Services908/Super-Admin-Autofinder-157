import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/adminNavbar/adminNavbar_Super";
import "../dashboard.css";

const adminDashboard_Super = () => {
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
        <h1>Super Admin Dashboard</h1>
        <br />
        <br />
        <hr />
      </div>
    </div>
  );
};

export default adminDashboard_Super;
