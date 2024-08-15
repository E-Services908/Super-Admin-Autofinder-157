import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const DealerPackagesApprovedRequests = () => {
  //Variables
  const [data , setData] = useState([]);

  // FUNCTIONS
  useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.post("https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll" , {approved:true})
        if(response.data.ok){
          setData(response.data.data)
        }
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, []);


  //COLUMNS
  const columns = [
    {
      name:"Name",
      selector:row=>row.user.name
    },
    {
      name:"Price",
      selector:row=>row.price
    },

  ]
  
  //JSX
  return ( 
    <div className="DealerPackagesApprovedRequests">
      <br />
      <h2>Approved Requests</h2>
      <br />
      <DataTable
        data={data}
        columns={columns}
      />
    </div>
   );
}
 
export default DealerPackagesApprovedRequests;