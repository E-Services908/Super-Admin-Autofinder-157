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
      selector:row=>row._id
    },
    {
      name:"Name",
      selector:row=>row.name
    },
  ]
  return (
    <div className="UserData">
      <h2>User Data</h2>
      <br/>
      <hr />
      <DataTable 
        data={userData}
        columns={columns}
        pagination={true}
      />
    </div>
  )
};

export default UserData;
