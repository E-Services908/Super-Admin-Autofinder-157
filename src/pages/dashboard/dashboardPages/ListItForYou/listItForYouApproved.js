import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";

const ListItForYouApproved = () => {
  //Variables
  const service = "001";
  const [data, setData] = useState([]);
  const [imageToBeViewed , setImageToBeViewed] = useState("")
  //Functions
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://autofinder-backend.vercel.app/api/userRequest/",
          { service: service, approved: true }
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleOpenImageModal = (base64)=>{
    setImageToBeViewed(base64)
    openModal()
  }


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
      name: "Client Name",
      selector: (row) => row.user.name,
    },
    {
      name: "Phone No.",
      selector: (row) => row.user.phoneNumber,
    },
    // {
    //   name:"Location",
    //   selector:row=>`${row.user.address} ${row.location}`,
    //   wrap:true,
    //   width:"30%"
    // },
    {
      name: "Car Detail",
      selector: (row) => `${row.year} ${row.brand} ${row.model} ${row.variant}`,
      wrap: true,
    },
    {
      name: "Payable Amount",
      selector: (row) => row.price,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name:"Image",
      selector:(row)=>(
        <button className="dataTableActionBtn green" onClick={()=>handleOpenImageModal(row.image)}>View Image</button>
      )
    }
  ];

  return (
    <div>
      <h2>List It For You Approved Requests</h2>
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
          <img  src={imageToBeViewed}/>
        </div>
      </Modal>
    </div>
  );
};

export default ListItForYouApproved;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
