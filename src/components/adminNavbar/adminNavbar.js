import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar = () => {

  
 
  return (
    <div className="AdminNavbar">
      <Link to="">Dashboard</Link>
      <NavLink to="user-data">User Data</NavLink>
      <NavLink to="list-it-for-you-data">List It For You Requests</NavLink>
      <NavLink to="car-inspection-data">Car inspection Requests</NavLink>
      <NavLink to="buy-car-for-me">Buy Car For Me</NavLink>
      <NavLink to="car-ad-request">Car Ad Request</NavLink>
      <NavLink to="dealer-packages">Dealer Packages</NavLink>
      <NavLink to={"data-entry"}>Data Entry</NavLink>
      <NavLink to={"blogs"}>Blogs</NavLink>
      <NavLink to={"videos"}>Videos</NavLink>
      <NavLink to={"newCars"}>New Cars</NavLink>
      
      {/* <NavLink to="boost-your-add-data">Boost Your Ad Requests</NavLink> */}
      {/* <Link onClick={()=>dropDownClass?setDropdownClass(""):setDropdownClass("dropCont")}>Test</Link>
      <div className={dropDownClass}>
        <Link className="sublink">Test</Link>
        <Link className="sublink">Test</Link>
        <Link className="sublink">Test</Link>

      </div> */}
    </div>
  );
};

export default AdminNavbar;
