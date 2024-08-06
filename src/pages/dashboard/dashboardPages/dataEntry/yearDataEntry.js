import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const YearDataEntry = () => {
  const [year, setYear] = useState("");
  const [yearData, setYearData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/year");
        // console.log(response.data);
        setYearData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id)=>{
    try {
      // PUT DELETE API HERE
    } catch (error) {
      // HANDE ERROR
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/year/post" , {year})
      console.log(response)
      if(response.data.ok){
        setYearData([...yearData, response.data.data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: "Year",
      selector: (row) => row.year,
    },
    {
      name: "Action",
      selector: row=>{
        return <button onClick={()=>handleDelete(row._id)}>Delete</button>
      }
    }
  ];

  return (
    <div className="YearDataEntry">
      <h1>Year Data Entry</h1>
      <div className="formHolder">
        <form>
          <div>
            <label htmlFor="year">Year</label>
            <input type="text" id="year" name="year" onChange={(e)=>setYear(e.target.value)} />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
      <div className="tableHolder">
        {yearData && <DataTable columns={columns} data={yearData} pagination />}
      </div>
    </div>
  );
};

export default YearDataEntry;
