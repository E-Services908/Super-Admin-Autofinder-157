import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CarVarientDataEntry = () => {
  const [varient, setVarient] = useState("");
  const [varientData, setVarientData] = useState(null);
  const [model, setModel] = useState("");
  const [modelData, setModelData] = useState(null);
  const [brand, setBrand] = useState("");
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    async function fetchBrandData() {
      try {
        const response = await axios.get("https://autofinder-backend.vercel.app/Brands");
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
          "https://autofinder-backend.vercel.app/Model/" + brand
        );
        console.log(response.data);
        setModelData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchModelData();
  }, [brand]);

  useEffect(() => {
    async function fetchVarientData(){
      try {
        const response = await axios.get("https://autofinder-backend.vercel.app/varient/"+model)
        console.log(response.data)
        setVarientData(response.data.products)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchVarientData()
  }, [model]);

  const columns = [
    {
      name: "Varient",
      selector:row=>row.name
    },
    {
      name:"Action",
      selector:row=>(
        <button>Delete</button>
      )
    }
  ]

  const handleSubmit = async (e)=>{
    e.preventDefault()
    // console.log(varient , model)
    try {
      const response = await axios.post("https://autofinder-backend.vercel.app/varient" , {
        name:varient,
        model:model
      })
      setVarientData([...varientData , response.data.data] )
      // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="CarVarient">
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
            <label>Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="">Select Model</option>
              {modelData &&
                modelData.map((model) => (
                  <option key={model._id} value={model._id}>
                    {model.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="carVarientName">Car Varient Name</label>
            <input
              type="text"
              name="carVarientName"
              id="carVarientName"
              placeholder="Car Varient Name"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
      <div className="tableHolder">
        {varientData && (
          <DataTable columns={columns} data={varientData} pagination={true} />
        )}
      </div>
    </div>
  );
};

export default CarVarientDataEntry;
