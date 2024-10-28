import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./adminNavbar.css";

const Admin_ManageAds = () => {
  return (
    <div className="AdminNavbar">
      <Link to="/Dashboard_ManageAds">Dashboard</Link>
      <NavLink to={"/car-manageAds"}>Manage Ads</NavLink>
    </div>
  );
};

export default Admin_ManageAds;

