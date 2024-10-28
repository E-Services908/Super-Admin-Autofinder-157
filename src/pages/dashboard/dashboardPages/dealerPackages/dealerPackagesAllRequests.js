import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const DealerPackagesAllRequests = () => {
  // Variables
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [imageToBeViewed, setImageToBeViewed] = useState("");

  // FUNCTIONS
  // -------------------------------
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.post(
  //         "https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll",
  //         { approved: false }
  //       );
  //       const response_1 = await axios.post(
  //         "https://autofinder-backend.vercel.app/api/bikePackageRequest/getAll",
  //         { approved: false }
  //       );
  //       if (response.data.ok && response_1.data.ok) {
  //         const All_Data = [...response.data.data, ...response_1.data.data]
  //         console.log(All_Data)
  //         setData(All_Data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error.response?.data?.error || error.message);
  //     }
  //   }
  //   fetchData();
  // }, []);
  // -------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/buyPackageRequest/getAll",
          { approved: false }
        );
        const response_1 = await axios.post(
          "https://autofinder-backend.vercel.app/api/bikePackageRequest/getAll",
          { approved: false }
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

  const handleApprove = async (userId, packageId, requestId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/buyPackage",
        { userId, packageId }
      );
      if (response.data.ok) {
        try {
          const res = await axios.post(
            "https://autofinder-backend.vercel.app/api/buyPackageRequest/update",
            // "https://autofinder-backend.vercel.app/api/bikePackageRequest/update",
            { requestId }
          );
          const newData = data.filter((item) => item._id !== res.data.data._id);
          setData(newData);
        } catch (error) {
          console.error(
            "Error updating request:",
            error.response?.data?.error || error.message
          );
        }
      }
    } catch (error) {
      console.error(
        "Error approving request:",
        error.response?.data?.error || error.message
      );
    }
  };

  // Bike Approve
  const handleApprove_1 = async (userId, packageId, requestId) => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/user/buyPackage",
        { userId, packageId }
      );
      if (response.data.ok) {
        try {
          const res = await axios.post(
            "https://autofinder-backend.vercel.app/api/bikePackageRequest/update",
            { requestId }
          );
          const newData = data.filter((item) => item._id !== res.data.data._id);
          setData(newData);
        } catch (error) {
          console.error(
            "Error updating request:",
            error.response?.data?.error || error.message
          );
        }
      }
    } catch (error) {
      console.error(
        "Error approving request:",
        error.response?.data?.error || error.message
      );
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `https://autofinder-backend.vercel.app/api/buyPackageRequest/${id}`
  //     );

  //     console.log('Delete Response:', response.data); // Log the response

  //     if (response.data.ok) {
  //       const newData = data.filter((item) => item._id !== id);
  //       setData(newData);
  //       alert("Request is Deleted");
  //     } else {
  //       alert("Error deleting item: " + (response.data.message || "Unknown error"));
  //     }
  //   } catch (error) {
  //     // Log error details
  //     console.error("Error details:", error);
  //     alert(`Error deleting item: ${error.response?.data?.error || error.message}`);
  //   }
  // };

  const handleOpenImageModal = (base64) => {
    setImageToBeViewed(base64);
    openModal();
  };

  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // --- Car COLUMNS ---
  const columns = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "10%",
    },
    {
      name: "Premium Bundles",
      selector: (row) =>
        row.package && row.package.premiumBundles
          ? row.package.premiumBundles
          : " - ",
      width: "15%",
    },
    {
      name: "Live Ad Days",
      selector: (row) =>
        row.package && row.package.liveAdDays ? row.package.liveAdDays : " - ",
      width: "15%",
    },
    {
      name: "Free Booster Pack",
      selector: (row) =>
        row.package && row.package.freeBoosterPack
          ? row.package.freeBoosterPack
          : " - ",
      width: "15%",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() =>
              handleApprove(row.user._id, row.package._id, row._id)
            }
          >
            Approve
          </button>
          <button
            style={{ margin: "0em 1em" }}
            onClick={() => handleOpenImageModal(row.image)}
          >
            View Image
          </button>
          {/* <button onClick={() => handleDelete(row._id)}>Delete</button> */}
        </div>
      ),
      width: "30%",
    },
  ];

  // --- Bike COLUMNS ---
  const columns_1 = [
    {
      name: "Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "15%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "10%",
    },
    {
      name: "Premium Bundles",
      selector: (row) =>
        row.package && row.package.premiumBundles
          ? row.package.premiumBundles
          : " - ",
      width: "15%",
    },
    {
      name: "Live Ad Days",
      selector: (row) =>
        row.package && row.package.liveAdDays ? row.package.liveAdDays : " - ",
      width: "15%",
    },
    {
      name: "Free Booster Pack",
      selector: (row) =>
        row.package && row.package.freeBoosterPack
          ? row.package.freeBoosterPack
          : " - ",
      width: "15%",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() =>
              handleApprove_1(row.user._id, row.package._id, row._id)
            }
          >
            Approve
          </button>
          <button
            style={{ margin: "0em 1em" }}
            onClick={() => handleOpenImageModal(row.image)}
          >
            View Image
          </button>
          {/* <button onClick={() => handleDelete(row._id)}>Delete</button> */}
        </div>
      ),
      width: "30%",
    },
  ];

  return (
    <div className="DealerPackagesAllRequests">
      {/* Car */}
      <br />
      <h2>Car All Requests to buy Dealer Package</h2>
      <br />
      <DataTable data={data} columns={columns} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Image</h2>
        <div className="imageHolderCont">
          <img src={imageToBeViewed} alt="Preview" />
        </div>
      </Modal>
      {/* Bike */}
      <br />
      <br />
      <br />
      <h2>Bike All Requests to buy Dealer Package</h2>
      <br />
      <DataTable data={data_1} columns={columns_1} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Image</h2>
        <div className="imageHolderCont">
          <img src={imageToBeViewed} alt="Preview" />
        </div>
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
  },
};

export default DealerPackagesAllRequests;
