import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-modal";


const DealerPackagesAllRequests = () => {
  //Variables
  const [data ,setData] = useState([])
  const [imageToBeViewed , setImageToBeViewed] = useState("")

  //FUNCTIONS
  useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.post("http://localhost:8000/api/buyPackageRequest/getAll" , {approved:false})
        if(response.data.ok){
          setData(response.data.data)
        }
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, []);

  const handleApprove = async (userId , packageId , requestId)=>{
    try {
      const response = await axios.post("http://localhost:8000/api/user/buyPackage" , {userId , packageId})
      console.log(response.data.ok)
      if(response.data.ok){
        try {
          const res = await axios.post("http://localhost:8000/api/buyPackageRequest/update" , {requestId})
         const newData = data.filter((item)=>item._id!==res.data.data._id)
          setData(newData)
        } catch (error) {
          
        }
      }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

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

  //COLUMNS
  const columns = [
    {
      name:"Name",
      selector:row=>row.user.name
    },
    {
      name:"Price",
      selector:row=>row.price
    },
    {
      name:"Action",
      selector:row=>(
        <div>
        <button onClick={()=>handleApprove(row.user._id , row.package._id , row._id)}>Approve</button>
        <button onClick={()=>handleOpenImageModal(row.image)}>View Image</button>
        </div>
      )
    },

  ]


  return ( 
    <div className="DealerPackagesAllRequests">
      <h2>All Requests to buy Dealer Package</h2>
      <DataTable 
        data={data}
        columns={columns}
      />
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

 
export default DealerPackagesAllRequests;