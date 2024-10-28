import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AdminNavbar from "../../../components/adminNavbar/admin_ManageAds";
import { useNavigate, useLocation } from "react-router-dom";

const ManageAdsEntry = () => {
  // --- User ID ---
  const { state } = useLocation(); // Corrected 'useLocation' usage
  const userId = state?.userId || localStorage.getItem("userId"); // Retrieve user ID
  const userName = state?.userName || localStorage.getItem("userName"); // Retrieve user ID
  // --- User ID ---
  // Main Body
  return (
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      {/* Body */}
      <div className="contentHolder">
        {/* Show User ID Here In Heading 1 Tag */}
        <p id="My_H5">User ID : {userId}</p> {/* Display User ID */}
        <p id="My_H5">Hello , {userName}</p> {/* Display User ID */}
        <h1>Manage Ads By Auto-Finder</h1>
        <p>Post Your Car Ad</p>
        <br />
        <hr />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ManageAdsEntry;
