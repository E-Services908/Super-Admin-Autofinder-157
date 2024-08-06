import {useEffect , useState} from "react"
import { Outlet } from "react-router-dom";
import Login from "../../pages/login/login";
const ProtectedRoute = () => {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"))
  }, []);

  return isLoggedIn ? <Outlet /> :  <Login/>;
  
    
  
}
 
export default ProtectedRoute;