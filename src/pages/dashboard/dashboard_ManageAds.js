import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminNavbar/admin_ManageAds";
import "./dashboard.css";

const dashboard_ManageAds = () => {
  // Main Body
  return (
    <div className="AdminDashboard">
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      <div className="contentHolder">
        <br />
        <br />
        <h1>Hello User !</h1>
        <h1>Manage Ads By Auto-Finder</h1>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default dashboard_ManageAds;


