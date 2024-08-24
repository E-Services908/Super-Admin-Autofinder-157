import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar_Inspect = () => {

  
 
  return (
    <div className="AdminNavbar">
      <Link to="/Dashboard_Inspect">Dashboard</Link>
      <NavLink to={"/Only_CarInspection_Home"}>Car Inspection</NavLink>
    </div>
  );
};

export default AdminNavbar_Inspect;
