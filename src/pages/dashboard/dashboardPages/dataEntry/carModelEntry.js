import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CarModelDataEntry = () => {
  const [model, setModel] = useState("");
  const [modelData, setModelData] = useState(null);
  const [brand, setBrand] = useState("");
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    async function fetchBrandData() {
      try {
        const response = await axios.get("http://localhost:8000/Brands");
        setBrandData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchBrandData();
  }, []);

  useEffect(() => {
    async function fetchModelData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/Model/"+brand
        );
        console.log(response.data)
        setModelData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchModelData();
  }, [brand]);

  const handleDelete = ()=>{
    try {
      // DELETE API HERE
    } catch (error) {
      // HANDLE ERROR HERE
    }
  }

  const columns = [
    {
      name:"Model",
      selector:row=>row.name
    },
    {
      name:"Action",
      selector:row=>(
        <button onClick={(id)=>handleDelete}>Delete</button>
      )

    }
  ]

  const handleSubmit = async (e)=>{
    e.preventDefault()
    // console.log(model , brand)
    try {
      const response = await axios.post("http://localhost:8000/Model" , {
        name:model,
        brand:brand
      })
      setModelData([...modelData , response.data.data])
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className="CarModelDataEntry">
      <div className="formHolder">
        <form>
          <div>
            <label>Brand</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Select Brand</option>
              {brandData &&
                brandData.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              name="carModel"
              id="carModel"
              placeholder="Car
            Model"
            onChange={(e)=>setModel(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Sumbit</button>
          </div>
        </form>
      </div>
      <div className="tableHolder">
        {
          modelData &&
          <DataTable 
          columns={columns}
          data={modelData}
          />
        }
        
      </div>
    </div>
  );
};

export default CarModelDataEntry;
