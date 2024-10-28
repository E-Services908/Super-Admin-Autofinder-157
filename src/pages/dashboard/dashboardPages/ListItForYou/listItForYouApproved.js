import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const ListItForYouApproved = () => {
  //Variables
  const service = "001";
  const [data, setData] = useState([]);
  const [imageToBeViewed, setImageToBeViewed] = useState("");
  //Functions
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await axios.post(
  //         "https://autofinder-backend.vercel.app/api/userRequest/",
  //         { service: service, approved: true }
  //       );
  //       setData(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getData();
  // }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("here");
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/carAd/",
          {
            ManagedByAutoFinder: true,
          }
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    fetchData();
  }, []);

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

  // DATA TABLE COULMNS
  const coulmns = [
    {
      name: "Client ID",
      selector: (row) => (row.user ? row.user : " - "),
      width: "20%",
    },
    {
      name: "Car Detail",
      selector: (row) =>
        row.year && row.brand && row.model
          ? `${row.year} ${row.brand} ${row.model} ${row.varient}`
          : " - ",
      width: "25%",
    },
    {
      name: "Price",
      selector: (row) => (row.price ? row.price : " - "),
      width: "15%",
    },
    {
      name: "Manage Ad",
      // selector: (row) => (row.ManagedByAutoFinder ? row.ManagedByAutoFinder : " - "),
      selector: (row) => {
        if (row.ManagedByAutoFinder === true) {
          return "Yes";
        } else if (row.ManagedByAutoFinder === false) {
          return "No";
        } else {
          return " - ";
        }
      },
      width: "15%",
    },
    {
      name: "Car Image",
      selector: (row) => (
        <button
          className="dataTableActionBtn green"
          onClick={() => handleOpenImageModal(row.images[0])}
        >
          View Car Image
        </button>
      ),
      width: "25%",
    },
  ];

  return (
    <div>
      <br />
      <br />
      <h2>List It For You Requests - Approved</h2>
      <br />
      <hr />
      <DataTable data={data} columns={coulmns} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Image</h2>
        <div className="imageHolderCont" alt="test">
          <img src={imageToBeViewed} />
        </div>
      </Modal>
    </div>
  );
};

export default ListItForYouApproved;

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
