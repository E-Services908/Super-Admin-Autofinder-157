import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const DealerPackagesAll = () => {
  const [data, setData] = useState([]);
  const [dataToBeUpdated, setDataToBeUpdated] = useState(null);
  const [heading, setHeading] = useState("");
  const [premiumBundles, setPremiumBundles] = useState("");
  const [liveAdDays, setLiveAdDays] = useState("");
  const [boosterPack, setBoosterPack] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [discountedRate, setDiscountedRate] = useState("");
  const [saved, setSaved] = useState("");
  const [costPerAd, setCostPerAd] = useState("");
  const [packageType , setPackageType] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          // "https://autofinder-backend.vercel.app/api/dealerPackage/getAll"
          "https://autofinder-backend.vercel.app/api/dealerPackage/getAllbike"
        );
        if (response.data.ok) {
          setData(response.data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      // heading,
      premiumBundles,
      liveAdDays,
      freeBoosterPack: boosterPack,
      actualPrice,
      discountedRate,
      saved,
      costPerAd,
    };

    if (!validation(updatedData)) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/dealerPackage/update",
        { _id: dataToBeUpdated._id, ...updatedData }
      );
      if (response.data.ok) {
        console.log(response.data.data);
        const newData = data.map((item) => {
          if (item._id === response.data.data._id) {
            return response.data.data; // Replace the object
          }
          return item; // Keep other objects unchanged
        });
        window.alert("Data Updated Successfully");
        setData(newData);
        emptyAllFields();
        closeModal();
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error updating data:", error.response.data.error);
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
    // {
    //   name: "Heading",
    //   selector: (row) => row.heading,
    //   width: "90px",
    // },
    {
      name: "Actual Price",
      selector: (row) => row.actualPrice,
    },
    {
      name: "Cost Per Ad",
      selector: (row) => row.costPerAd,
    },
    {
      name: "Discounted Rate",
      selector: (row) => row.discountedRate,
    },
    {
      name: "Live Ad Days",
      selector: (row) => row.liveAdDays,
    },
    {
      name: "Premium Bundles",
      selector: (row) => row.premiumBundles,
    },
    {
      name: "Saved",
      selector: (row) => row.saved,
    },
    {
      name: "Action",
      selector: (row) => (
        <button onClick={() => handleOpenModal(row)}>Update</button>
      ),
    },
  ];

  //JSX
  return (
    <div className="DealerPackagesAll">
      <br />
      <h2>All Packages</h2>
      <br />
      <DataTable data={data} columns={columns} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Package</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Type:</label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            >
              <option value="Executive">Executive Pack</option>
              <option value="Power">Power Pack</option>
              <option value="Booster">Booster Pack</option>
            </select>
          </div>
          {/* <div>
            <label>Heading</label>
            <input
              type="text"
              value={heading}
              placeholder={dataToBeUpdated.heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div>
            <label>Premium Bundles</label>
            <input
              type="text"
              value={premiumBundles}
              placeholder={dataToBeUpdated.premiumBundles}
              onChange={(e) => setPremiumBundles(e.target.value)}
            />
          </div>
          <div>
            <label>Live Ad Days</label>
            <input
              type="text"
              value={liveAdDays}
              placeholder={dataToBeUpdated.liveAdDays}
              onChange={(e) => setLiveAdDays(e.target.value)}
            />
          </div>
          <div>
            <label>Booster Pack</label>
            <input
              type="text"
              value={boosterPack}
              placeholder={dataToBeUpdated.freeBoosterPack}

              onChange={(e) => setBoosterPack(e.target.value)}
            />
          </div>
          <div>
            <label>Actual Price</label>
            <input
              type="text"
              value={actualPrice}
              placeholder={dataToBeUpdated.actualPrice}

              onChange={(e) => setActualPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Discounted Rate</label>
            <input
              type="text"
              value={discountedRate}
              placeholder={dataToBeUpdated.discountedRate}

              onChange={(e) => setDiscountedRate(e.target.value)}
            />
          </div>
          <div>
            <label>You Saved</label>
            <input
              type="text"
              value={saved}
              placeholder={dataToBeUpdated.saved}

              onChange={(e) => setSaved(e.target.value)}
            />
          </div>
          <div>
            <label>Cost Per Ad</label>
            <input
              type="text"
              value={costPerAd}
              placeholder={dataToBeUpdated.costPerAd}

              onChange={(e) => setCostPerAd(e.target.value)}
            />
          </div> */}
          <button type="submit" style={{"width":"200px"}}>ADD DEALER PACKAGE</button>
        </form>
      </Modal>
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height:"500px"
  },
};

export default DealerPackagesAll;
