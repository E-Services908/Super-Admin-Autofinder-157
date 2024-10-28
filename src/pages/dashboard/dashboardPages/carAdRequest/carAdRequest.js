import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";

const CarAdRequest = () => {
  //Variables
  const [data, setData] = useState([]);
  const [imageToBeViewed, setImageToBeViewed] = useState("");
  const [requestToBeApproved, setRequestToBeApproved] = useState(null);

  //Functions
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("here");
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/carAdRequest/"
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);

  const deleteRequest = async (id) => {
    try {
      const res = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAdRequest/delete",
        { _id: id }
      );
      if (res.data.ok) {
        const newData = data.filter((item) => item._id !== res.data.data._id);
        setData(newData);
        closeConfirmModal();
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleApprove = async function (data) {
    const userId = data.user._id;
    let { _id, priceToPay, image, createdAt, updatedAt, user, ...newData } =
      data;
    if (data.days) {
      newData = { ...newData, user: userId, featured: true };
    } else {
      newData = {
        ...newData,
        user: userId,
        featured: false,
        days: null,
        paidStandardAd: true,
      };
    }
    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/carAd/upload",
        newData
      );
      // const response = await axios.post(
      //   "https://autofinder-backend.vercel.app/api/carAd/upload",
      //   { user: userId, featured: true }
      // );
      if (response.data.ok) {
        deleteRequest(data._id);
        console.log(" Car Ad - User ID - Successfully Passed : ", userId);
      }
    } catch (error) {
      console.log(error.response.data.error);
      console.log(" User ID Failed : ", userId);
    }
  };

  // const handleApprove = async function (data) {
  //   const userId = data.user._id;

  //   try {
  //     // First API call to update the `featured` field
  //     const response = await axios.put(
  //       `https://autofinder-backend.vercel.app/api/carAd/${data._id}`,
  //       { featured: true }
  //     );

  //     // Check if the update was successful
  //     if (response.data.ok) {
  //       // Call deleteRequest if necessary
  //       deleteRequest(data._id);
  //       console.log("Car Ad Updated : ", data._id);
  //       console.log("User ID Passed : ", userId);

  //       // Prepare new data for the second API call
  //       const newData = {
  //         carAdId: data._id,
  //         userId: userId,
  //         // Add other necessary fields here
  //         // e.g., title, description, images, etc.
  //       };

  //       // Second API call to upload the car ad
  //       try {
  //         const uploadResponse = await axios.post(
  //           "https://autofinder-backend.vercel.app/api/carAd/upload",
  //           newData
  //         );

  //         // Check if the upload was successful
  //         if (uploadResponse.data.ok) {
  //           console.log("Car Ad Uploaded Successfully : ", data._id);
  //         }
  //       } catch (uploadError) {
  //         console.log(
  //           "Car Ad upload failed: ",
  //           uploadError.response?.data?.error || "An error occurred"
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.response?.data?.error || "An error occurred");
  //     console.log("User ID Failed: ", userId);
  //   }
  // };

  const handleOpenImageModal = (base64) => {
    setImageToBeViewed(base64);
    openModal();
  };

  const handleOpenConfirmModal = (data) => {
    console.log("here");
    setRequestToBeApproved(data);
    openConfirmModal();
  };

  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function openConfirmModal() {
    setConfirmModalIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeConfirmModal() {
    setConfirmModalIsOpen(false);
  }

  //COLUMNS FOR DATATABLE
  const columns = [
    {
      name: "Client Name",
      selector: (row) => (row.user && row.user.name ? row.user.name : " - "),
      width: "20%",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.brand && row.model && row.year
          ? `${row.brand} ${row.model} ${row.year}`
          : " - ",
      width: "20%",
    },
    {
      name: "Location",
      selector: (row) => (row.location ? row.location : " - "),
      width: "10%",
    },
    {
      name: "Transmission",
      selector: (row) => (row.transmission ? row.transmission : " - "),
      width: "20%",
    },
    {
      name: "Price",
      selector: (row) => (row.priceToPay ? row.priceToPay : " - "),
      width: "10%",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="dataTableActionBtn green"
            onClick={() => handleOpenImageModal(row.image)}
          >
            <FaRegFileImage />
          </button>
          {/* <button className="dataTableActionBtn green" onClick={() => handleOpenConfirmModal(row._id)}><MdOutlineDoneOutline /></button> */}
          <button
            className="dataTableActionBtn green"
            onClick={() => handleApprove(row)}
          >
            <MdOutlineDoneOutline />
          </button>
          <button onClick={() => deleteRequest(row._id)}>Del</button>
        </div>
      ),
      width: "20%",
    },
  ];

  //JSX
  return (
    <div className="CarAdRequest">
      <h2>Car Ad Request</h2>
      <DataTable data={data} columns={columns} pagination={true} />
      {/* IMAGE MODAL */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Image</h2>
        <div className="imageHolderCont" alt="test">
          <img src={imageToBeViewed} />
        </div>
      </Modal>
      {/* CONFIRM MODAL */}
      <Modal
        isOpen={confirmModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeConfirmModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Confirm</h2>
        <div>
          <p>Are you sure you want to approve this ad?</p>
          <button onClick={() => handleApprove(requestToBeApproved)}>
            Yes
          </button>
          <button onClick={() => closeConfirmModal()}>No</button>
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

export default CarAdRequest;
