import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function My_Test() {
  // --- Car Id ---
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  
  useEffect(() => {
    async function getCarDetail() {
      try {
        const response = await axios.get(
          `https://autofinder-backend.vercel.app/api/carAd/${id}`
        );
        if (response.data.ok) {
          setCarDetail(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCarDetail();
  }, [id]); // Include id in the dependency array

  // Store the car id in a variable
  const My_ID = carDetail?._id;
  // New Variable
  const ID_Pass = My_ID
  // --- Car Id ---
  
  // Main Body
  return (
    <div>
      <h1>
        {carDetail?.brand || "N/A"} {carDetail?.model || "N/A"}{" "}
        {carDetail?.year || "N/A"} {carDetail?.variant || "N/A"}
      </h1>
      <br />
      <h1>{ID_Pass || "N/A"}</h1>
    </div>
  );
}

export default My_Test;
