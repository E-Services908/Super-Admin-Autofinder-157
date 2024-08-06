import { NavLink , Outlet } from "react-router-dom";
import "./dataEntry.css"
const DataEntry = () => {

 return(
  <div className="DataEntry">
      <NavLink to="year">Year Data</NavLink>
      <NavLink to={"car-brand"}>Car Brand</NavLink>
      <NavLink to={"car-model"}>Car Model</NavLink>
      <NavLink to="car-varient">Car Varient</NavLink>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
 )
}
 
export default DataEntry;