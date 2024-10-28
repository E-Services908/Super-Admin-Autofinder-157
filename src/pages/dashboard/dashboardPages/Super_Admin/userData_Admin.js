import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import AdminNavbar from "../../../../components/adminNavbar/adminNavbar_Super";

const UserData_Admin = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          "https://autofinder-backend.vercel.app/api/user/all"
        );
        // console.log(response.data.data)
        setUserData(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getUsers();
  }, []);

  // --- Delete Function ---
  const handleDeleteUser = async (id) => {
    try {
      console.log("Deleting User ID:", id); // Log the clicked ID
      const response = await axios.delete(
        `https://autofinder-backend.vercel.app/api/user/${id}`
      );

      if (response.status === 200) {
        console.log("User Deleted Successfully");
        alert("User Deleted Successfully");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => (row._id ? row._id : " - "),
      width: "20%",
    },
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : " - "),
      width: "15%",
    },
    {
      name: "Email",
      selector: (row) => (row.email ? row.email : " - "),
      width: "20%",
    },
    {
      name: "Phone Number",
      selector: (row) => (row.phoneNumber ? row.phoneNumber : " - "),
      width: "15%",
    },
    {
      name: "User Type",
      selector: (row) => (row.userType ? row.userType : " - "),
      width: "15%",
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="dataTableActionBtn red"
          onClick={() => handleDeleteUser(row._id)}
        >
          <i class="fa fa-trash"></i>
        </button>
      ),
      width: "15%",
    },
  ];
  return (
    <div className="AdminDashboard">
      {/* Admin Navbar */}
      <div className="contentHeader">
        <AdminNavbar />
      </div>
      {/* Main Body */}
      <div className="contentHolder">
        <br />
        <h1>All User's Record in Auto Finder</h1>
        <br />
        <hr />
        <br />
        {/* Main Body */}
        <DataTable data={userData} columns={columns} pagination={true} />
      </div>
    </div>
  );
};

export default UserData_Admin;
