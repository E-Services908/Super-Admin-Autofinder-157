import { NavLink, Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/adminNavbar/adminNavbar_Inspect";
import "../../dashboard/dashboardPages/carInspectionRequest/carInspection.css";

const Only_CI_Home = () => {
  return (
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      <div id="My_Only_Link">
        {/* <NavLink to="/Only_CI_Pending">Pending</NavLink> */}
        <NavLink to="/Only_CI_Approved">All Request</NavLink>
        <NavLink to="/Only_CI_All">All Inspection Report</NavLink>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Only_CI_Home;
