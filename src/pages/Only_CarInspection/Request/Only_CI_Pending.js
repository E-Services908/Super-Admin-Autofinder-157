import React, { useEffect, useState } from "react";
import "../../dashboard/dashboardPages/carInspectionRequest/carInspection.css";
import AdminNavbar from "../../../components/adminNavbar/adminNavbar_Inspect";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

function Only_CI_Pending() {
  // --- Logic ---
  const [data, setData] = useState([]);
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [imageToBeViewed, setImageToBeViewed] = useState("");
  const [selectedService, setSelectedService] = useState("004");
  const [noDataMessage, setNoDataMessage] = useState("");

  //Functions
  useEffect(() => {
    async function getData() {
      try {
        // Fetch data for the selected service only
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/",
          {
            service: selectedService,
            approved: false,
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

  const handleOpenImageModal = (img) => {
    setImageToBeViewed(img);
    openImageModel();
  };
  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = React.useState(false);

  function openImageModel() {
    setImageModalIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeImageModal() {
    setImageModalIsOpen(false);
  }

  //COLUMNS
  const coulmns = [
    {
      name: "Client Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
    },
    {
      name: "Phone No.",
      selector: (row) =>
        row.user && row.user.phoneNumber ? row.user.phoneNumber : " - ",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.year && row.brand && row.model && row.variant
          ? `${row.year} ${row.brand} ${row.model} ${row.variant}`
          : " - ",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
    },
    {
      name: "Service",
      selector: (row) => (row.service ? row.service : " - "),
    },
    {
      name: "Car Image",
      cell: (row) => (
        <div>
          <button
            className="dataTableActionBtn gray"
            onClick={() => handleOpenImageModal(row.image)}
          >
            Img
          </button>
        </div>
      ),
      width: "20%",
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          <i
            class="fa fa-clock-o"
            style={{ fontSize: "35px", color: "red" }}
          ></i>
        </div>
      ),
      width: "10%",
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
        <h1>Your All Car Inspection Request - ( Pending )</h1>

        <br />
        <hr />
        <br />
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
        <Modal
          isOpen={imageModalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeImageModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Image</h2>
          <div className="imageHolderCont" alt="test">
            <img src={imageToBeViewed} />
          </div>
        </Modal>
      </div>
    </div>
  );
}
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
export default Only_CI_Pending;
