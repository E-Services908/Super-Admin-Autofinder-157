import React from "react";
// import "../../dashboard/dashboardPages/carInspectionRequest/carInspection.css";
import "../../dashboard/dashboard.css";
import AdminNavbar from "../../../components/adminNavbar/adminNavbar_Inspect";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function Only_CI_All() {
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
          responseType: "blob", // Specify that we expect a binary response
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a link element, set its href to a URL created from the Blob, and simulate a click to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${id}.pdf`); // Set the download file name
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
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      {/* Main Body */}
      <div className="contentHolder">
        <br />
        <h1>All Car Inspection Report's File</h1>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}

export default Only_CI_All;
