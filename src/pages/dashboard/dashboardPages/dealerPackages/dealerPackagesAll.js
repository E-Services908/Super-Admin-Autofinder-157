import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import "./dealerPackages.css";
import { PiX } from "react-icons/pi";

const DealerPackagesAll = () => {
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [dataToBeUpdated, setDataToBeUpdated] = useState(null);
  const [Myheading, setHeading] = useState("");
  const [MypremiumBundles, setPremiumBundles] = useState("");
  const [MyliveAdDays, setLiveAdDays] = useState("");
  const [boosterPack, setBoosterPack] = useState("");
  const [MyactualPrice, setActualPrice] = useState("");
  const [MydiscountedRate, setDiscountedRate] = useState("");
  const [Mysaved, setSaved] = useState("");
  const [MycostPerAd, setCostPerAd] = useState("");
  const [MypackageType, setPackageType] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAll"
          // "https://autofinder-backend.vercel.app/api/dealerPackage/getAllbike"
        );
        const response_1 = await axios.get(
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAllbike"
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

  const handleOpenModal = (data) => {
    setDataToBeUpdated(data);
    openModal();
  };

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

  const emptyAllFields = () => {
    setActualPrice("");
    setBoosterPack("");
    setCostPerAd("");
    setDataToBeUpdated(null);
    setDiscountedRate("");
    setHeading("");
    setPremiumBundles("");
    setLiveAdDays("");
    setSaved("");
  };

  // --- Update Car Dealer ---
  const handleSubmit_Car = async (e) => {
    // Gather data into an object for validation
    const updatedData = {
      heading: Myheading,
      premiumBundles: MypremiumBundles,
      liveAdDays: MyliveAdDays,
      freeBoosterPack: boosterPack,
      actualPrice: MyactualPrice,
      discountedRate: MydiscountedRate,
      saved: Mysaved,
      costPerAd: MycostPerAd,
      packageType: MypackageType,
    };

    // Validate fields
    if (!validation(updatedData)) {
      alert("Please fill all the fields correctly.");
      return; // Stop function execution if validation fails
    }

    try {
      // Sending the POST request if validation is successful
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/dealerPackage/update",
        {
          _id: dataToBeUpdated._id, // Passing the ID separately
          ...updatedData, // Spread the updated data
        }
      );

      if (response.data.ok) {
        // Update the data state with the new data
        const newData = data.map((item) => {
          if (item._id === response.data.data._id) {
            return response.data.data; // Replace the matching object
          }
          return item; // Keep other objects unchanged
        });

        // Show success message
        alert("Data Updated Successfully");
        setData(newData); // Update the data state
        emptyAllFields(); // Clear the form fields
        closeModal(); // Close the modal
      }
    } catch (error) {
      // Log the error message to the console
      console.error(
        "Error updating data:",
        error.response?.data?.error || error.message
      );
    }
  };

  // --- Update Bike Dealer ---
  const handleSubmit_Bike = async (e) => {
    // Gather data into an object for validation
    const updatedData = {
      heading: Myheading,
      premiumBundles: MypremiumBundles,
      liveAdDays: MyliveAdDays,
      freeBoosterPack: boosterPack,
      actualPrice: MyactualPrice,
      discountedRate: MydiscountedRate,
      saved: Mysaved,
      costPerAd: MycostPerAd,
      packageType: MypackageType,
    };

    // Validate fields
    if (!validation(updatedData)) {
      alert("Please fill all the fields correctly.");
      return; // Stop function execution if validation fails
    }

    try {
      // Sending the POST request if validation is successful
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/dealerPackage/updatebike",
        {
          _id: dataToBeUpdated._id, // Passing the ID separately
          ...updatedData, // Spread the updated data
        }
      );

      if (response.data.ok) {
        // Update the data state with the new data
        const newData = data_1.map((item) => {
          if (item._id === response.data.data._id) {
            return response.data.data; // Replace the matching object
          }
          return item; // Keep other objects unchanged
        });

        // Show success message
        alert("Data Updated Successfully");
        setData_1(newData); // Update the data state
        emptyAllFields(); // Clear the form fields
        closeModal(); // Close the modal
      }
    } catch (error) {
      // Log the error message to the console
      console.error(
        "Error updating data:",
        error.response?.data?.error || error.message
      );
    }
  };

  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  //COULMS FOR DATA TABLE
  const columns = [
    {
      name: "Sr. No",
      selector: (row) => (row.heading ? row.heading : " - "),
      width: "10%",
    },
    {
      name: "Actual Price",
      selector: (row) => (row.actualPrice ? row.actualPrice : " - "),
      width: "10%",
    },
    {
      name: "Cost Per Ad",
      selector: (row) => (row.costPerAd ? row.costPerAd : " - "),
      width: "10%",
    },
    {
      name: "Discounted Rate",
      selector: (row) => (row.discountedRate ? row.discountedRate : " - "),
      width: "15%",
    },
    {
      name: "Live Ad Days",
      selector: (row) => (row.liveAdDays ? row.liveAdDays : " - "),
      width: "10%",
    },
    {
      name: "Premium Bundles",
      selector: (row) => (row.premiumBundles ? row.premiumBundles : " - "),
      width: "15%",
    },
    {
      name: "Saved",
      selector: (row) => (row.saved ? row.saved : " - "),
      width: "10%",
    },
    {
      name: "Action",
      selector: (row) => (
        <button onClick={() => handleOpenModal(row)}>Update</button>
      ),
      width: "20%",
    },
  ];

  //JSX
  return (
    <div className="DealerPackagesAll">
      <br />
      <h2>All Car Dealer Packages</h2>
      <br />
      <DataTable data={data} columns={columns} />
      <br />
      <br />
      <h2>All Bike Dealer Packages</h2>
      <br />
      <DataTable data={data_1} columns={columns} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2
          style={{ padding: "1.5em 0em 1.5em 0em" }}
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          Update Package
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label
            style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}
            htmlFor=""
          >
            Type :
          </label>{" "}
          &nbsp;
          <select
            value={MypackageType}
            onChange={(e) => setPackageType(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              width: "50%",
              border: "0.1px solid rgb(185, 185, 185)",
            }}
          >
            <option value="Executive">Executive Pack</option>
            <option value="Power">Power Pack</option>
            <option value="Booster">Booster Pack</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}>
            Heading
          </label>
          <input
            type="text"
            value={Myheading}
            // placeholder={dataToBeUpdated.heading}
            placeholder=" Enter Updated Data "
            onChange={(e) => setHeading(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}>
            Premium Bundles
          </label>
          <input
            type="text"
            value={MypremiumBundles}
            // placeholder={dataToBeUpdated.premiumBundles}
            placeholder=" Enter Updated Data "
            onChange={(e) => setPremiumBundles(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ width: "50%", fontSize: "0.8em", letterSpacing: 1 }}>
            Live Ad Days
          </label>
          <input
            type="text"
            value={MyliveAdDays}
            // placeholder={dataToBeUpdated.liveAdDays}
            placeholder=" Enter Updated Data "
            onChange={(e) => setLiveAdDays(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}>
            Booster Pack
          </label>
          <input
            type="text"
            value={boosterPack}
            // placeholder={dataToBeUpdated.freeBoosterPack}
            placeholder=" Enter Updated Data "
            onChange={(e) => setBoosterPack(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}>
            Actual Price
          </label>
          <input
            type="text"
            value={MyactualPrice}
            // placeholder={dataToBeUpdated.actualPrice}
            placeholder=" Enter Updated Data "
            onChange={(e) => setActualPrice(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ fontSize: "0.8em", letterSpacing: 1, width: "50%" }}>
            Discounted Rate
          </label>
          <input
            type="text"
            value={MydiscountedRate}
            // placeholder={dataToBeUpdated.discountedRate}
            placeholder=" Enter Updated Data "
            onChange={(e) => setDiscountedRate(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ width: "50%", fontSize: "0.8em", letterSpacing: 1 }}>
            You Saved
          </label>
          <input
            type="text"
            value={Mysaved}
            // placeholder={dataToBeUpdated.saved}
            placeholder=" Enter Updated Data "
            onChange={(e) => setSaved(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
              width: "50%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0em 0em 0.5em 0em",
          }}
        >
          <label style={{ width: "50%", fontSize: "0.8em", letterSpacing: 1 }}>
            Cost Per Ad
          </label>
          <input
            type="text"
            value={MycostPerAd}
            // placeholder={dataToBeUpdated.costPerAd}
            placeholder=" Enter Updated Data "
            onChange={(e) => setCostPerAd(e.target.value)}
            style={{
              fontSize: "0.8em",
              letterSpacing: 2,
              width: "50%",
              padding: "0.7em 0em 0.7em 1em",
              margin: "0.2em 0em 0.2em 0em",
            }}
          />
        </div>
        {/* --- Update Car Dealer --- */}
        <button
          onClick={() => {
            handleSubmit_Car();
          }}
          style={{ width: "95%" }}
        >
          Update Car Dealer Package
        </button>
        {/* --- Update Bike Dealer --- */}
        <button
          onClick={() => {
            handleSubmit_Bike();
          }}
          style={{ width: "95%" }}
        >
          Update Bike Dealer Package
        </button>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    width: "40%",
    padding: "0px 50px 20px 50px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // height: "500px",
  },
};

export default DealerPackagesAll;
