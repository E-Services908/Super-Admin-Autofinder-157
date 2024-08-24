import React, { useEffect, useState} from "react";
import axios from "axios";
import AdminNavbar from "../../components/adminNavbar/adminNavbar_Inspect";
import { useNavigate } from "react-router-dom";
import "./Only_CarInspection_Login.css"

function Only_CarInspection_Home() {
  // API
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd",
          {
            page,
            limit: 3,
          }
        );
        if (response.data.ok) {
          console.log(response.data.data);
          setData(response.data.data);
          // setData((prevData) => [...prevData, ...response.data.data]);
        }
      } catch (error) {
        console.log(error);
        setNoDataError(error.response.data.error);
      }
    }
    console.time("timer");
    getData();
    console.timeLog("timer");
  }, [page]);
  // Function
  const handleNavigateToSingleCarAd = (itemId) => {
    navigate(`/Only_Report/${itemId}`);
  };
  // Main Body
  return (
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      {/* Body */}
      <div className="contentHolder">
        <h1>Car Inspection</h1>
        <p>Select A Car For Car Inspection</p>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <h2>Cars</h2>
        <br />
        {/* Show Cars From Here */}
        {data &&
          data.map((item) => (
            <div
              key={item._id}
              className="adCard"
              onClick={() => handleNavigateToSingleCarAd(item._id)}
            >
              <div className="imgHolder">
                <img src={item.images[0]} alt="" />
              </div>
              <div className="detailHolder">
                <h4 className="My_adTitle">
                  {item.brand} {item.model} {item.year} {item.varient}
                </h4>
                <p id="My_adTitle_1">{item.location}</p>
                <p id="My_adTitle_2">
                  {item.kmDriven.toLocaleString()} km | {item.assembly} |{" "}
                  {item.fuelType} | {item.transmission}{" "}
                </p>
              </div>
            </div>
          ))}
          <br />
      </div>
    </div>
  );
}

export default Only_CarInspection_Home;
