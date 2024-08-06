import React from "react";
import {NavLink, Outlet } from "react-router-dom";
import "./listItForYou.css"
const ListItForYouData = () => {
  
  //JSX
  return (
    <div className="ListItForYouData">
      <NavLink to="pending">Pending</NavLink>
      <NavLink to="approved">Approved</NavLink>
      <Outlet/>
    </div>
  );
};

export default ListItForYouData;
