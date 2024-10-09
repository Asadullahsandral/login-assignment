// Report.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  Form,
  Table,
  Navbar,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Selector from "./Selector";
import Quizcreator from "./quiz/Quizcreator";
import CreateQuiz from "./quiz/CreateQuiz";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const userId = localStorage.getItem("id");
  // const token = localStorage.getItem("token");
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
  const handleGenerateReport = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/report", {
        params: { startDate, endDate },
      });
      console.log(response.data); // Assuming the API returns an array of users
      setUsers(response.data); // Assuming the API returns an array of users
      setError("");
    } catch (err) {
      setError("Failed to fetch report data.");
      setUsers([]);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <div className="container my-4">
      <Navbar className="bg-body-tertiary bg-primary-subtle">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <Button variant="outline-success">Home</Button>
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
      <CreateQuiz />
      <h1
        style={{
          background: "linear-gradient(120deg,#2980b9, #8e44ad)",
          borderRadius: "5px",
          marginTop: "25px",
          color: "white",
          padding: "10px",
          textTransform: "uppercase",
        }}
      >
        USERS REPORT
      </h1>
      <Form
        style={{
          backgroundColor: "antiquewhite",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="6"
            controlId="startDate"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="endDate"
            style={{ textAlign: "left" }}
          >
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Button
          className="mt-3 "
          variant="primary"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      {users.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Education</th>
              <th>Marital Status</th>
              <th>City</th>
              <th>User Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.education}</td>
                <td>{user.maritalStatus}</td>
                <td>{user.city}</td>
                <td>{user.userType}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Report;
