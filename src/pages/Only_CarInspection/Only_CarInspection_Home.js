import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/adminNavbar/adminNavbar_Inspect";
import { useNavigate, useLocation } from "react-router-dom";
import "./Only_CarInspection_Login.css";

function Only_CarInspection_Home() {
  // API
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [noDataError, setNoDataError] = useState("");

  // --- User ID ---
  const { state } = useLocation(); // Corrected 'useLocation' usage
  const userId = state?.userId || localStorage.getItem("userId"); // Retrieve user ID
  const userName = state?.userName || localStorage.getItem("userName"); // Retrieve user ID

  // --- User ID ---
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/"
        );

        if (response && response.data && response.data.ok) {
          // Filter records to show only those where userAllocate._id matches userId
          const filteredData = response.data.data.filter(
            (item) => item.userAllocate?._id === userId
          );

          setData(filteredData);

          if (filteredData.length === 0) {
            setNoDataError("No Request Here");
          } else {
            setNoDataError("");
          }
        } else {
          setNoDataError("Failed to fetch car data. Please try again.");
        }
      } catch (error) {
        console.log(error);
        setNoDataError(
          error.response?.data?.error ||
            "An error occurred while fetching data."
        );
      }
    }
    getData();
  }, [userId, page]);

  // Function
  // const handleNavigateToSingleCarAd = (itemId) => {
  //   navigate(`/Only_Report/${itemId}`);
  // };
  const handleNavigateToSingleCarAd = async (itemId) => {
    try {
      // Find the clicked item based on the ID
      const clickedItem = data.find((item) => item._id === itemId);

      if (!clickedItem) {
        console.error("Clicked item not found in the data.");
        return;
      }

      // Log the clicked item's details for debugging
      console.log("Clicked Item Details:");
      console.log("Location:", clickedItem.location);
      console.log("Brand:", clickedItem.brand);
      console.log("Model:", clickedItem.model);
      console.log("Year:", clickedItem.year);
      console.log("Variant:", clickedItem.varient);

      // Fetch all records from the carAd API to compare
      const carAdResponse = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd",
        { page, limit: 10 }
      );

      if (carAdResponse && carAdResponse.data && carAdResponse.data.ok) {
        // Find a matching record in the API data
        const matchingRecord = carAdResponse.data.data.find((record) => {
          return (
            record.location === clickedItem.location &&
            record.brand === clickedItem.brand &&
            record.model === clickedItem.model &&
            record.year == clickedItem.year && // Allow loose equality for year comparison
            record.varient === clickedItem.varient // Ensure consistent field naming
          );
        });

        // Check if a matching record is found
        if (matchingRecord) {
          console.log(" Matching Car ID:", matchingRecord._id);
          alert(" Matching Car ID: " + matchingRecord._id);
          
          // Navigate to the Only_Report page and pass the matched ID
          navigate(`/Only_Report/${matchingRecord._id}`);
          return; // Stop further execution
        } else {
          console.log("No matching record found.");
        }
      } else {
        console.error(
          "Failed to fetch carAd data or incorrect API response format."
        );
      }
    } catch (error) {
      console.error("Error fetching carAd data:", error.message);
      console.error("Error details:", error.response?.data);
    }

    // Continue navigation if no match is found
    navigate(`/Only_Report/${itemId}`);
    alert(" No Car ID Matched ");
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
        {/* Show User ID Here In Heading 1 Tag */}
        <p id="My_H5">User ID : {userId}</p> {/* Display User ID */}
        <p id="My_H5">Hello , {userName}</p> {/* Display User ID */}
        <h1>Car Inspection</h1>
        <p>List Of Request For Car Inspection</p>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <h2>Cars</h2>
        <br />
        {/* Show Cars From Here */}
        {noDataError ? (
          <p>{noDataError}</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="adCard"
              onClick={() => handleNavigateToSingleCarAd(item._id)}
            >
              <div className="imgHolder">
                <img src={item.image} alt="" />
              </div>
              <div className="detailHolder">
                <h4 className="My_adTitle">
                  {item.brand} &nbsp; {item.model} &nbsp; {item.year} &nbsp;{" "}
                  {item.varient}
                </h4>
                <p id="My_adTitle_1">{item.location}</p>
                <p id="My_adTitle_2">Request For Inspection</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Only_CarInspection_Home;
