import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DealerPackagesAdd = () => {
  // VARIABLES
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [premiumBundles, setPremiumBundles] = useState("");
  const [liveAdDays, setLiveAdDays] = useState("");
  const [boosterPack, setBoosterPack] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [discountedRate, setDiscountedRate] = useState("");
  const [saved, setSaved] = useState("");
  const [costPerAd, setCostPerAd] = useState("");
  const [packageType, setPackageType] = useState("");
  // FUNCTIONS
  const validation = (data) => {
    for (let key in data) {
      console.log(key);
      if (!data.hasOwnProperty(key)) {
        return false;
      }
      if (data[key] === "" || data[key] === null) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit_Car = async (e) => {
    e.preventDefault();
    const data = {
      heading,
      premiumBundles,
      liveAdDays,
      freeBoosterPack: boosterPack,
      actualPrice,
      discountedRate,
      saved,
      costPerAd,
      packageType,
    };

    if (validation(data)) {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/dealerPackage/add",
          data
        );
        if (response.data.ok) {
          alert("Dealer Package Added Successfully");
          navigate("/dashboard/dealer-packages/all");
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      alert("PLEASE FILL ALL THE DATA");
    }
  };

  // Bike Add
  const handleSubmit_Bike = async (e) => {
    e.preventDefault();
    const data = {
      heading,
      premiumBundles,
      liveAdDays,
      freeBoosterPack: boosterPack,
      actualPrice,
      discountedRate,
      saved,
      costPerAd,
      packageType,
    };

    if (validation(data)) {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/dealerPackage/addbike",
          data
        );
        if (response.data.ok) {
          alert("Dealer Package Added Successfully");
          navigate("/dashboard/dealer-packages/all");
        }
      } catch (error) {
        console.log(error.response);
      }
    } else {
      alert("PLEASE FILL ALL THE DATA");
    }
  };

  // JSX
  return (
    <div className="DealerPackagesAdd">
      <br />
      <h2>Add Dealer Package</h2>
      <br />
      <div>
        <label htmlFor="">Type :</label>
        <select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="Executive">Executive Pack</option>
          <option value="Power">Power Pack</option>
          <option value="Booster">Booster Pack</option>
        </select>
      </div>
      <div>
        <label>Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Premium Bundles</label>
        <input
          type="text"
          value={premiumBundles}
          onChange={(e) => setPremiumBundles(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Live Ad Days</label>
        <input
          type="text"
          value={liveAdDays}
          onChange={(e) => setLiveAdDays(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Booster Pack</label>
        <input
          type="text"
          value={boosterPack}
          onChange={(e) => setBoosterPack(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Actual Price</label>
        <input
          type="text"
          value={actualPrice}
          onChange={(e) => setActualPrice(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Discounted Rate</label>
        <input
          type="text"
          value={discountedRate}
          onChange={(e) => setDiscountedRate(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>You Saved</label>
        <input
          type="text"
          value={saved}
          onChange={(e) => setSaved(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <div>
        <label>Cost Per Ad</label>
        <input
          type="text"
          value={costPerAd}
          onChange={(e) => setCostPerAd(e.target.value)}
          placeholder=" Enter Value"
        />
      </div>
      <button
        onClick={() => {
          handleSubmit_Car();
        }}
      >
        ADD CAR DEALER PACKAGE
      </button>
      <button
        onClick={() => {
          handleSubmit_Bike();
        }}
      >
        ADD Bike DEALER PACKAGE
      </button>
    </div>
  );
};

export default DealerPackagesAdd;
