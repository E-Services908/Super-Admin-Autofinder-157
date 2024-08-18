import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/adminNavbar/adminNavbar";
import "./dashboard.css";
const adminDashboard = () => {
  return (
    <div className="AdminDashboard">
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      <div className="contentHolder">
        <Outlet />
      </div>
    </div>
  );
};

export default adminDashboard;
