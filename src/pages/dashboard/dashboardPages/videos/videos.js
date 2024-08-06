import { Outlet, NavLink } from "react-router-dom";
import "./videos.css"
const Videos = () => {
  return (
    <div className="Videos">
      <NavLink to="post">Post</NavLink>
      {/* <NavLink to="approved">Approved</NavLink> */}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Videos;
