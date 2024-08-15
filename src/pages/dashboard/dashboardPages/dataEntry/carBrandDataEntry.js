import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CarBrandDataEntry = () => {
  const [brand, setBrand] = useState("");
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://autofinder-backend.vercel.app/Brands");
        // console.log(response.data)
        setBrandData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id)=>{
    try {
      // DELETE API HERE
    } catch (error) {
      // HANDLE ERROR
    }
  }

  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('https://autofinder-backend.vercel.app/Brands' , {
        name:brand
      })
      console.log(response)
      setBrandData([...brandData ,  response.data.data])
    } catch (error) {
      console.log(error.response)
    }
  }

  const columns = [
    {
      name: "Brand Name",
      selector:row=>row.name
    },
    {
      name:"Action",
      selector:row=>{
        return(
          <button onClick={()=>handleDelete(row._id)}>Delete</button>
        )
      }
    }
  ]

  return (
    <div className="CarBrandDataEntry">
      <h1>Car Brand Data Entry</h1>
      <div className="formHolder">
        <form>
          <div>
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              name="brandName"
              id="brandName"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
      <div className="tableHolder">
        {
          brandData && <DataTable columns={columns} data={brandData} pagination />
        }
      </div>
    </div>
  );
};

export default CarBrandDataEntry;
