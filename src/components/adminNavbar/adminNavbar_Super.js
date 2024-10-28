import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar_Super = () => {
  return (
    <div className="AdminNavbar">
      <Link to="/Dashboard_Super">Dashboard</Link>
      <NavLink to={"/UserData_Admin"}>All User's Record</NavLink>
      <NavLink to={"/Admin_Add_User"}>Add Admin User</NavLink>
    </div>
  );
};

export default AdminNavbar_Super;
