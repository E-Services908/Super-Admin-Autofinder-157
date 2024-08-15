import React from "react";
import {useEffect , useState} from "react"
import axios from "axios"
import DataTable from "react-data-table-component";
import Modal from 'react-modal';
import { MdDeleteForever } from "react-icons/md";


const BuyCarForMePending = () => {
  //Variables
  const service = "003"
  const [data, setData] = useState([])
  const [idToBeDeleted , setIdToBeDeleted] = useState("")
  const [imageToBeViewed , setImageToBeViewed] = useState("")

  //Functions
  useEffect(() => {
    async function getData(){
      try {
        const response = await axios.post("https://autofinder-backend.vercel.app/api/userRequest/" , {service:service, approved:false});
        setData(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, []);

  const handleDelete = (id)=>{
    setIdToBeDeleted(id)
    openModal()
  }

  const handleOpenImageModal = (img)=>{
    setImageToBeViewed(img)
    openImageModel()
  }

  const handleConfirmedDelete =async ()=>{
    try {
      const response  = await axios.post('https://autofinder-backend.vercel.app/api/userRequest/delete' , {id:idToBeDeleted?idToBeDeleted:""})
      if(response.data.ok){
        const newData = data.filter((item)=>item._id!==idToBeDeleted)
        setData(newData)
        setIdToBeDeleted("")
        closeModal()
      }
    } catch (error) {  
      alert(`${error.response.data.error}`) 
    }
  }

  const handleUpdate =async (id)=>{
    try {
      const response = await axios.post("https://autofinder-backend.vercel.app/api/userRequest/update" , {id})
      console.log(response.data.ok)
      if(response.data.ok){
        const newData = data.filter((item)=> item._id !== id)
        setData(newData)
        alert("Request Approved Successfully!")
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }

  // MODAL FUNCTIONS
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = React.useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function openImageModel(){
    setImageModalIsOpen(true)
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeImageModal(){
    setImageModalIsOpen(false)
  }


  //COLUMNS
  const coulmns = [
    {
      name: "Client Name",
      selector:row=>row.user.name
    },
    {
      name:"Phone No.",
      selector:row=>row.user.phoneNumber
    },
    {
      name:"Car Detail",
      selector:row=>`${row.year} ${row.brand} ${row.model} ${row.variant}`
    },
    {
      name:"Price",
      selector:row=>row.price
    },
    {
      name:"Action",
      cell: row => (
        <div>
          <button className="dataTableActionBtn gray" onClick={()=>handleOpenImageModal(row.image)}>Img</button>
          <button className="dataTableActionBtn green" onClick={()=>handleUpdate(row._id)}>✓</button>
          <button className="dataTableActionBtn red" onClick={()=>handleDelete(row._id)}><MdDeleteForever /></button>
        </div>
      )
    }
  ]


  return ( 
    <div className="CarInspectionPending">
      <h2>Car Inspection Request Pending</h2>
      <br/>
      <hr />
      <DataTable 
        data={data}
        columns={coulmns}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Confirm Delete</h2>
        <p>Are you sure you want to delete this record?</p>
        <button onClick={closeModal} style={{float: "right", marginLeft:"15px"}}>No</button>
        <button onClick={handleConfirmedDelete} style={{float: "right", marginLeft:"15px"}}>Yes</button>
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
          <img  src={imageToBeViewed}/>
        </div>
      </Modal>
    </div>
   );
}

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

 
export default BuyCarForMePending;