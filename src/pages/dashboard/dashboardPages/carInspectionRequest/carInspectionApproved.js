import React from "react";
import {useEffect , useState} from "react"
import axios from "axios"
import DataTable from "react-data-table-component";

const CarInspectionApproved = () => {
  //Variables
  const service = "002"
  const [data, setData] = useState([])

  //Functions
  useEffect(() => {
    async function getData(){
      try {
        const response = await axios.post("http://localhost:8000/api/userRequest/" , {service:service, approved:true});
        setData(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, []);

  
  const coulmns = [
    {
      name: "Client Name",
      selector:row=>row.user.name
    },
    {
      name:"Phone No.",
      selector:row=>row.user.phoneNumber
    },
    {
      name:"Car Detail",
      selector:row=>`${row.year} ${row.brand} ${row.model} ${row.variant}`
    },
    {
      name:"Price",
      selector:row=>row.price
    }
  ]


  return ( 
    <div>
      <h2>Car Inspection Approved</h2>
      <br/>
      <hr />
      <DataTable 
        data={data}
        columns={coulmns}
      />
    </div>
   );
}
 
export default CarInspectionApproved;