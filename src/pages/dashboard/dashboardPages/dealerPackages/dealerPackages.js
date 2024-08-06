import { NavLink, Outlet } from "react-router-dom";
import "./dealerPackages.css";
const DealerPackages = () => {
  return (
    <div className="DealerPackages">
      <NavLink to="all">All Packages</NavLink>
      <NavLink to="add">Add Package</NavLink>
      <NavLink to="all-requests">View All Requests</NavLink>
      <NavLink to="approved-requests">Approved Request</NavLink>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default DealerPackages;
