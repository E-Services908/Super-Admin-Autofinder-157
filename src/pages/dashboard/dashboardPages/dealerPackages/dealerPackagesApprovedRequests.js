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
        const response = await axios.post("http://localhost:8000/api/buyPackageRequest/getAll" , {approved:true})
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
      <h2>Approved Requests</h2>
      <DataTable
        data={data}
        columns={columns}
      />
    </div>
   );
}
 
export default DealerPackagesApprovedRequests;