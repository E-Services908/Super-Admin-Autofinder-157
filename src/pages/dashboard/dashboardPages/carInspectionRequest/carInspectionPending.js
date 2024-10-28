import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "./carInspection.css";

//Component
const CarInspectionPending = () => {
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

  const handleDelete = (id) => {
    setIdToBeDeleted(id);
    openModal();
  };

  const handleOpenImageModal = (img) => {
    setImageToBeViewed(img);
    openImageModel();
  };

  const handleConfirmedDelete = async () => {
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/userRequest/delete",
        {
          id: idToBeDeleted ? idToBeDeleted : "",
        }
      );
      if (response.data.ok) {
        const newData = data.filter((item) => item._id !== idToBeDeleted);
        setData(newData);
        setIdToBeDeleted("");
        closeModal();
      }
    } catch (error) {
      alert(`${error.response.data.error}`);
    }
  };

  const handleUpdate = async (id) => {
    if (!selectedUser) {
      alert("Please select an inspector first.");
      return; // Exit the function if no inspector is selected
    }

    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/userRequest/update",
        {
          _id: id, // Pass the item ID
          approved: true, // Set approved to true
          userAllocate: selectedUser, // Pass the selected user ID
        }
      );
      console.log("ID Finally Passed:", { id, userAllocate: selectedUser }); // Log the IDs
      if (response.data.ok) {
        const newData = data.filter((item) => item._id !== id);
        setData(newData);
        alert("Request Approved Successfully!");
      }
    } catch (error) {
      console.log("Could not update the request:", error.response.data);
    }
  };

  //  --- Get ALl User ---
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    // Fetch all users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/user/all"
        );
        if (response.data.ok) {
          // Filter users with userType "Inspector"
          const inspectors = response.data.data.filter(
            (user) => user.userType === "Inspector"
          );
          setUserList(inspectors); // Set filtered user data
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  //  --- Get ALl User ---
  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openImageModel() {
    setImageModalIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeImageModal() {
    setImageModalIsOpen(false);
  }

  //COLUMNS
  const coulmns = [
    {
      name: "Client Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "10%",
    },
    {
      name: "Phone No.",
      selector: (row) =>
        row.user && row.user.phoneNumber ? row.user.phoneNumber : " - ",
      width: "10%",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.year && row.brand && row.model
          ? `${row.year} ${row.brand} ${row.model} ${row.varient}`
          : " - ",
      width: "15%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "10%",
    },
    {
      name: "Service",
      selector: (row) => (row.service ? row.service : " - "),
      width: "10%",
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="dataTableActionBtn gray"
            onClick={() => handleOpenImageModal(row.image)}
          >
            Img
          </button>
          <button
            className="dataTableActionBtn green"
            onClick={() => handleUpdate(row._id)} // Ensure selectedUser is used in handleUpdate
          >
            ✓
          </button>
          <button
            className="dataTableActionBtn red"
            onClick={() => handleDelete(row._id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),
      width: "20%",
    },
    {
      name: "Select Inspector",
      cell: (row) => (
        <select
          value={selectedUser}
          onChange={(e) => {
            setSelectedUser(e.target.value);
            console.log(e.target.value); // Log the selected user ID
          }}
        >
          <option value="">Select Inspector</option>
          {userList.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      ),
      width: "25%",
    },
  ];

  return (
    <div className="CarInspectionPending">
      <br />
      <h2>Car Inspection Request Pending</h2>
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
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Confirm Delete</h2>
        <p>Are you sure you want to delete this record?</p>
        <button
          onClick={closeModal}
          style={{ float: "right", marginLeft: "15px" }}
        >
          No
        </button>
        <button
          onClick={handleConfirmedDelete}
          style={{ float: "right", marginLeft: "15px" }}
        >
          Yes
        </button>
      </Modal>

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

export default CarInspectionPending;
