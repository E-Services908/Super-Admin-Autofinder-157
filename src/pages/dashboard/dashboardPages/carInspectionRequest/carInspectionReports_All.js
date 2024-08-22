import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../carInspectionRequest/carInspection.css";

function CarInspectionReports_All() {
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/carInspectionReport"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  // Function to handle the "Download Report" button click
  const handleShowReport = async (id) => {
    try {
      console.log("Clicked ID:", id); // Log the clicked ID
      const response = await axios.get(
        `https://autofinder-backend.vercel.app/api/carInspectionReport/${id}`,
        {
          responseType: 'blob', // Specify that we expect a binary response
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a link element, set its href to a URL created from the Blob, and simulate a click to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.pdf`); // Set the download file name
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Reports ID",
      selector: (row) => row._id,
    },
    {
      name: "Download Report",
      cell: (row) => (
        <button
          className="dataTableActionBtn red"
          onClick={() => handleShowReport(row._id)} // Pass the item's _id here
        >
          Download Report
        </button>
      ),
      width: "20%",
    },
  ];

  // Main Body
  return (
    <div className="CarInspectionPending">
      <br />
      <h2>Car Inspection Reports All</h2>
      <br />
      <hr />
      <DataTable data={data} columns={columns} />
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default CarInspectionReports_All;
