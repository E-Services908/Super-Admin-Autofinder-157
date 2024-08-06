import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";

const CarAdRequest = () => {
  //Variables
  const [data, setData] = useState([]);
  const [imageToBeViewed , setImageToBeViewed] = useState("")
  const [requestToBeApproved , setRequestToBeApproved] = useState(null)

  //Functions
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('here')
        const response = await axios.get(
          "http://localhost:8000/api/carAdRequest/"
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
        "http://localhost:8000/api/carAdRequest/delete",
        { _id: id }
      );
      if (res.data.ok) {
        const newData = data.filter(item=>item._id!==res.data.data._id)
        setData(newData)
        closeConfirmModal()
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleApprove = async function (data) {
    const userId = data.user._id;
    let { _id, priceToPay, image, createdAt, updatedAt, user, ...newData } = data;
    if(data.days){
      newData = { ...newData, user: userId, featured: true };
    }else{
      newData = { ...newData, user:userId , featured:false , days:null , paidStandardAd:true}

    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/carAd/upload",
        newData
      );
      if (response.data.ok) {
        deleteRequest(data._id);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleOpenImageModal = (base64)=>{
    setImageToBeViewed(base64)
    openModal()
  }

  const handleOpenConfirmModal = (data)=>{
    console.log("here")
    setRequestToBeApproved(data)
    openConfirmModal()
  }

  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [confirmModalIsOpen , setConfirmModalIsOpen] = useState(false)
  function openModal() {
    setIsOpen(true);
  }
  function openConfirmModal(){
    setConfirmModalIsOpen(true)
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeConfirmModal(){
    setConfirmModalIsOpen(false)
  }


  //COLUMNS FOR DATATABLE
  const columns = [
    {
      name: "Name",
      selector: (row) => row.user.name,
    },
    {
      name:"Location",
      selector:(row)=>row.location
    },
    {
      name:"Car Detail",
      selector:(row)=>`${row.brand} ${row.model}`
    },
    {
      name:"Price",
      selector:(row)=>row.priceToPay
    },
    {
      name:"Action",
      selector:(row)=>(
        <div>
          <button className="dataTableActionBtn green" onClick={()=>handleOpenImageModal(row.image)}><FaRegFileImage /></button>
          <button className="dataTableActionBtn green" onClick={() => handleOpenConfirmModal(row)}><MdOutlineDoneOutline /></button>
          <button onClick={()=>deleteRequest(row._id)}>Del</button>
        </div>
      )
    }
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
          <img  src={imageToBeViewed}/>
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
          <button onClick={()=>handleApprove(requestToBeApproved)}>Yes</button>
          <button onClick={()=>closeConfirmModal()}>No</button>
        </div>
      </Modal>
    </div>
  );
};

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


export default CarAdRequest;
