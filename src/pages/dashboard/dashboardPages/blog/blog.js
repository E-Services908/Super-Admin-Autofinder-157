import {Outlet,NavLink} from "react-router-dom";
import "./blog.css"
const Blogs = () => {
  return ( 
    <div className="Blog">
      <NavLink to="post">Post</NavLink>
      {/* <NavLink to="approved">Approved</NavLink> */}
      <div className="outlet">
        <Outlet/>
      </div>
    </div>
   );
}
 
export default Blogs;