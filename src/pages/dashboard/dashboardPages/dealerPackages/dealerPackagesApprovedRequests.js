import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const DealerPackagesApprovedRequests = () => {
  //Variables
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);

  // FUNCTIONS
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll",
          { approved: true }
        );
        const response_1 = await axios.post(
          "https://autofinder-backend.vercel.app/api/bikePackageRequest/getAll",
          { approved: true }
        );
        if (response.data.ok && response_1.data.ok) {
          setData(response.data.data);
          setData_1(response_1.data.data);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);

  //COLUMNS
  const columns = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "20%",
    },
    {
      name: "Price",
      selector: (row) => (row.price && row.price ? row.price : " - "),
      width: "20%",
      // selector:row=>row.price
    },
    {
      name: "Premium Bundles",
      selector: (row) =>
        row.package && row.package.premiumBundles
          ? row.package.premiumBundles
          : " - ",
      width: "20%",
      // selector:row=>row.price
    },
    {
      name: "Live Ad Days",
      selector: (row) =>
        row.package && row.package.liveAdDays ? row.package.liveAdDays : " - ",
      width: "20%",
      // selector:row=>row.price
    },
    {
      name: "Free Booster Pack",
      selector: (row) =>
        row.package && row.package.freeBoosterPack
          ? row.package.freeBoosterPack
          : " - ",
      width: "20%",
      // selector:row=>row.price
    },
  ];

  //JSX
  return (
    <div className="DealerPackagesApprovedRequests">
      <br />
      <h2>Car Approved Requests</h2>
      <br />
      <DataTable data={data} columns={columns} />
      <br />
      <br />
      <br />
      <h2>Bike Approved Requests</h2>
      <br />
      <DataTable data={data_1} columns={columns} />
    </div>
  );
};

export default DealerPackagesApprovedRequests;
