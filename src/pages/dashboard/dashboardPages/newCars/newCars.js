import { NavLink ,Outlet } from "react-router-dom";
const NewCars = () => {
  return ( 
    <div className="ListItForYouData">
      <NavLink to="add">Add Car</NavLink>
      <Outlet/>
    </div>
   );
}
 
export default NewCars;