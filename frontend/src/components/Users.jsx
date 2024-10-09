import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import "./register.css";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import RegisterMDB from "./RegisterMDB";

const User = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");

  const userId = localStorage.getItem("id");
  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      // alert("Session expired Please log in again.");
      Swal.fire({
        title: "Session expired",
        text: "please log in again",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    }
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAll");
      setUsers(response.data);
      setOriginalUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };
  const navigate = useNavigate();
  const handleShow = (user, editing = false) => {
    setSelectedUser(user);
    setIsEditing(editing);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`);
        fetchUsers(); // Refresh the user list after deletion
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/update/${selectedUser._id}`,
        selectedUser
      );
      fetchUsers(); // Refresh user list
      handleClose(); // Close modal
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  useEffect(() => {
    if (userId === null) {
      navigate("/login");
    }

    fetchUsers();
  }, []);
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setUsers(originalUsers); // Reset users when search is empty
    } else {
      const filtered = originalUsers.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value)
      );
      setUsers(filtered);
    }
    setPage(0);
  };
  // const handleSearchChange = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearchTerm(value);
  //   const filtered = users.filter(
  //     (user) =>
  //       `${user.fname} ${user.lname}`.toLowerCase().includes(value) ||
  //       user.email.toLowerCase().includes(value)
  //   );
  //   setUsers(filtered);
  //   setPage(0);
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-1">
      <Navbar className="bg-body-tertiary bg-primary-subtle">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Button variant="outline-success">Home</Button>
            </Link>
            <Link to="/report">
              <Button variant="outline-success" className="ms-1">
                Generate Report
              </Button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar>
              {/* <Link to="/users">
                <Button variant="outline-success">View All Users</Button>
              </Link> */}
              <Button className="btn btn-warning mx-2 " onClick={handleLogout}>
                Logout
              </Button>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>ALL USERS</h1>

      <Box sx={{ marginBottom: 2, marginTop: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Marital Status</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell style={{ textAlign: "left" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {user.email}
                  </TableCell>{" "}
                  <TableCell style={{ textAlign: "left" }}>
                    {user.maritalStatus}
                  </TableCell>{" "}
                  <TableCell style={{ textAlign: "left" }}>
                    {user.city}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className="btn btn-info me-2"
                      onClick={() => handleShow(user)}
                      size="sm"
                    >
                      <GrView />
                    </Button>
                    <Button
                      className="btn btn-warning me-2"
                      onClick={() => handleShow(user, true)}
                      size="sm"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                      size="sm"
                    >
                      <FaDeleteLeft />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal for Viewing and Updating User Information */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "View User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <form
              onSubmit={isEditing ? handleSubmit : (e) => e.preventDefault()}
              className="row g-4"
            >
              <div className=" col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={selectedUser.firstName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={selectedUser.lastName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Marital Status</label>
                <select
                  className="form-select"
                  name="maritalStatus"
                  value={selectedUser.maritalStatus}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      maritalStatus: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                >
                  <option value="">Select Marital Status</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={selectedUser.address}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={selectedUser.country}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      country: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={selectedUser.city}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, city: e.target.value })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Province</label>
                <input
                  type="text"
                  className="form-control"
                  name="province"
                  value={selectedUser.province}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      province: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  required
                />
              </div>
              {isEditing && (
                <Button type="submit" className="btn btn-primary">
                  Update User
                </Button>
              )}
            </form>
          )}
        </Modal.Body>
      </Modal>

      {/* <RegisterMDB className="mt-5" /> */}
    </div>
  );
};

export default User;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/getAll");
//       setUsers(response.data);
//     } catch (err) {
//       setError("Failed to fetch users.");
//     }
//   };

//   const handleView = (userId) => {
//     navigate(`/userinfo/${userId}`);
//   };

//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:8000/api/delete/${userId}`);
//         fetchUsers();
//       } catch (err) {
//         setError("Failed to delete user.");
//       }
//     }
//   };

//   const handleUpdate = (userId) => {
//     navigate(`/edit/${userId}`);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (error) return <p className="text-danger">{error}</p>;

//   return (
//     <div className="container my-4">
//       <h1>All Users</h1>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Sr No</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Marital Status</th>
//             <th>City</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>
//                 {user.firstName} {user.lastName}
//               </td>
//               <td>{user.email}</td>
//               <td>{user.maritalStatus}</td>
//               <td>{user.city}</td>
//               <td>
//                 <button
//                   className="btn btn-info me-2"
//                   onClick={() => handleView(user._id)}
//                 >
//                   View
//                 </button>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() => handleUpdate(user._id)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(user._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;
