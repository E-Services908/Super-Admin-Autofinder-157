import { NavLink, Outlet } from "react-router-dom";
import "./carInspection.css";
const CarInspectionData = () => {
  return (
    <div className="CarInspectionData">
      <NavLink to="pending">Pending</NavLink>
      <NavLink to="approved">Approved</NavLink>
      {/* <NavLink to="add-report">Add Report</NavLink> */}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default CarInspectionData;
