import { NavLink, Outlet } from "react-router-dom";

const BuyCarForMe = () => {
  return (
    <div className="CarInspectionData">
      <NavLink to="pending">Pending</NavLink>
      <NavLink to="approved">Approved</NavLink>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyCarForMe;
