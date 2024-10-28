import {useState,useEffect} from "react"
import axios from "axios"
import DataTable from 'react-data-table-component';
const UserData = () => {
  const [userData , setUserData] = useState([])
  useEffect(() => {
    async function getUsers(){
      try {
        const response = await axios.get("https://autofinder-backend.vercel.app/api/user/all")
        // console.log(response.data.data)
        setUserData(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getUsers()
  }, []);

  const columns = [
    {
      name:"ID",
      selector: (row) => (row._id ? row._id : " - "),
      width: "20%",
    },
    {
      name:"Name",
      selector: (row) => (row.name ? row.name : " - "),
      width: "15%",
    },
    {
      name:"Email",
      selector: (row) => (row.email ? row.email : " - "),
      width: "20%",
    },
    {
      name:"Phone Number",
      selector: (row) => (row.phoneNumber ? row.phoneNumber : " - "),
      width: "15%",
    },
    {
      name:"Address",
      selector: (row) => (row.address ? row.address : " - "),
      width: "15%",
    },
    {
      name:"User Type",
      selector: (row) => (row.userType ? row.userType : " - "),
      width: "15%",
    },
  ]
  return (
    <div className="UserData">
      <br/>
      <br/>
      <h2>All User's Data in Auto Finder</h2>
      <br/>
      <hr />
      <br/>
      <br/>
      <br/>
      <DataTable 
        data={userData}
        columns={columns}
        pagination={true}
      />
    </div>
  )
};

export default UserData;
