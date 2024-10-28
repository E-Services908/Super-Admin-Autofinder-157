import React, { useState, useEffect } from "react";
import "../../dashboard/dashboardPages/carInspectionRequest/carInspection.css";
import AdminNavbar from "../../../components/adminNavbar/adminNavbar_Inspect";
import axios from "axios";
import DataTable from "react-data-table-component";

function Only_CI_Approved() {
  // --- Logic ---
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState("004"); // Default service
  const [noDataMessage, setNoDataMessage] = useState("");

  // Functions
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/",
          {
            service: selectedService,
            approved: true,
          }
        );
        const fetchedData = response.data.data;
        if (fetchedData.length === 0) {
          setNoDataMessage("No Data In This Service");
          setData([]);
        } else {
          setNoDataMessage("");
          setData(fetchedData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [selectedService]);

  const coulmns = [
    {
      name: "Client Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Phone No.",
      selector: (row) =>
        row.user && row.user.phoneNumber ? row.user.phoneNumber : " - ",
      width: "15%",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.year && row.brand && row.model
          ? `${row.year} ${row.brand} ${row.model} ${row.varient}`
          : " - ",
      width: "20%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "10%",
    },
    {
      name: "Service",
      selector: (row) => (row.service ? row.service : " - "),
      width: "10%",
    },
    {
      name: "Inspector Allocate",
      selector: (row) =>
        row.userAllocate
          ? row.userAllocate.name
            ? row.userAllocate.name
            : " - "
          : "Not Appointed",
      width: "15%",
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          <i
            class="fa fa-check-circle"
            style={{ fontSize: "30px", color: "green" }}
          ></i>
        </div>
      ),
      width: "15%",
    },
  ];
  // --- Logic ---
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
        <h1>Your All Car Inspection Request - ( Done )</h1>
        <br />
        <hr />
        <br />
        {/* Main Body */}
        <div style={{ padding: "1em 0em" }}>
          <span style={{ padding: "1em 0em 0em 0em" }}>Choose Service</span>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ width: "10%" }}
          >
            <option value="001">001</option>
            <option value="002">002</option>
            <option value="003">003</option>
            <option value="004">004</option>
          </select>
          <br />
          <br />
          <br />
          {noDataMessage ? (
            <p>{noDataMessage}</p>
          ) : (
            <DataTable data={data} columns={coulmns} />
          )}
        </div>
        <br />
      </div>
    </div>
  );
}

export default Only_CI_Approved;
