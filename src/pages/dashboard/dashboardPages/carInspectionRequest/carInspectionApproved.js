import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const CarInspectionApproved = () => {
  // Variables
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
      width: "25%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "15%",
    },
    {
      name: "Service",
      selector: (row) => (row.service ? row.service : " - "),
      width: "15%",
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
  ];
  // Main Body
  return (
    <div>
      <br />
      <h2>Car Inspection Approved</h2>
      <br />
      <hr />
      {/* --- Show Service Select Portion --- */}
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
      {/* --- Modal --- */}
    </div>
  );
};

export default CarInspectionApproved;
