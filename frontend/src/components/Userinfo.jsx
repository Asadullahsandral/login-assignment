import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";
import Editcurrentuser from "./Editcurrentuser";
import Addinfo from "./Addinfo";
// import Navbars from "./Navbar";
// import RegisterMDB from "./RegisterMDB";
import "./userinfo.css";
import Swal from "sweetalert2";
import CreateQuiz from "./quiz/CreateQuiz";

const Userinfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddInfoModal, setShowAddInfoModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [education, setEducation] = useState({
    degreeTitle: "",
    startDate: "",
    endDate: "",
    instituteName: "",
    majorSubjects: "",
  });
  const [workExperience, setWorkExperience] = useState({
    title: "",
    organization: "",
    fromDate: "",
    toDate: "",
    jobDescription: "",
  });
  const [skills, setSkills] = useState({
    skilltitle: "",
    skillLevel: "",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
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
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getone/${userId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      navigate("/login");
      // setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    if (userId === null) {
      navigate("/login");
    }
    fetchUser();
  }, []);

  const handleEdit = () => {
    setUpdatedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/delete/${user._id}`);
        navigate("/register");
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  const handleAddMoreInfo = () => {
    setShowAddInfoModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  const handleCloseAddInfo = () => {
    setShowAddInfoModal(false);
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmitUserUpdate = async (e) => {
    e.preventDefault();
    try {
      const newForm = new FormData();
      newForm.append("userType", updatedUser.userType);
      newForm.append("firstName", updatedUser.firstName);
      newForm.append("lastName", updatedUser.lastName);
      newForm.append("email", updatedUser.email);
      newForm.append("username", updatedUser.username);
      newForm.append("password", updatedUser.password);
      newForm.append("address", updatedUser.address);
      newForm.append("city", updatedUser.city);
      newForm.append("province", updatedUser.province);
      newForm.append("zip", updatedUser.zip);
      newForm.append("country", updatedUser.country);
      newForm.append("maritalStatus", updatedUser.maritalStatus);
      newForm.append("education", updatedUser.education);
      newForm.append("profileImage", updatedUser.profileImage);
      await axios.put(`http://localhost:8000/api/update/${userId}`, newForm);
      fetchUser();
      handleCloseEdit();
    } catch (err) {
      setError("Failed to update user information.");
    }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      // console.log("ok");
      await axios.put(`http://localhost:8000/api/updateMoreInfo/${userId}`, {
        ...education,
      });
      fetchUser();
      handleCloseAddInfo();
      // setEducation({
      //   degreeTitle: "",
      //   startDate: "",
      //   endDate: "",
      //   instituteName: "",
      //   majorSubjects: "",
      // });
    } catch (err) {
      setError("Failed to update user education.");
    }
  };
  // console.log("Education added:", education);
  // handleCloseAddInfo();

  const handleAddWorkExperience = async (e) => {
    e.preventDefault();
    try {
      // console.log("ok");
      await axios.put(`http://localhost:8000/api/updateMoreInfo/${userId}`, {
        ...workExperience,
      });
      fetchUser();
      handleCloseAddInfo();
      // setWorkExperience({
      //   title: "",
      //   fromDate: "",
      //   toDate: "",
      //   jobDescription: "",
      //   organization: "",
      // });
    } catch (err) {
      setError("Failed to update user education.");
    }
    // console.log("Work Experience added:", workExperience);
    // handleCloseAddInfo();
  };

  const handleAddSkills = async (e) => {
    e.preventDefault();
    try {
      // console.log("ok");
      await axios.put(`http://localhost:8000/api/updateMoreInfo/${userId}`, {
        ...skills,
      });
      fetchUser();
      handleCloseAddInfo();
      // setWorkExperience({
      //   skilltitle: "",
      //   skillLevel: "",
      // });
    } catch (err) {
      setError("Failed to update user education.");
    }
    // console.log("Skills added:", skills);
    // handleCloseAddInfo();
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userType");
    navigate("/login");
  };
  const handleFileChange = (e) => {
    setUpdatedUser((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      {/* <Navbars
        handleAddMoreInfo={handleAddMoreInfo}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleLogout={handleLogout}
      /> */}
      <Navbar className="bg-body-tertiary bg-primary-subtle">
        <Container>
          <Navbar.Brand>
            <Link to="/report">
              <Button variant="outline-success">View All Users</Button>
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

      <div className="container">
        <div className="main">
          {/* <div className="topbar">
            <a href="/">Logout</a>
          </div> */}
          <div className="row">
            <div className="col-md-4 mt-1">
              <div className="card text-center sidebar align-items-center py-3">
                <img
                  src={"http://localhost:8000/" + user.profileImage}
                  alt="Profile"
                  className="rounded-circle"
                  width={150}
                  height={150}
                />
                <div className="mt-3">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="d-grid gap-2">
                    <Button
                      className="btn btn-primary"
                      // size="sm"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button
                      className="btn btn-primary"
                      onClick={handleAddMoreInfo}
                    >
                      Add More Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-1 text-start">
              <h1
                style={{
                  textAlign: "center",
                  backgroundColor: "teal",
                  padding: "5px 0px",
                  color: "wheat",
                  borderRadius: "5px",
                }}
              >
                USER INFORMATION
              </h1>
              <div className="card-body fw-bold">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Email</h5>
                  </div>
                  <div className="col-md-9 text-secondary">{user.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Username</h5>
                  </div>
                  <div className="col-md-9 text-secondary">{user.username}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Address</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {user.address},{user.city}, {user.province}, {user.country}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>City</h5>
                  </div>
                  <div className="col-md-9 text-secondary">{user.city}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Work Experience</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {user.title}, {user.organization}, {user.fromDate} -{" "}
                    {user.toDate}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Marital Status</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {user.maritalStatus}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Education</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {user.education} {user.degreeTitle}, {user.majorSubjects},{" "}
                    {user.endDate} - {user.startDate},{user.instituteName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Skills</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    {user.skilltitle},{user.skillLevel}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Editcurrentuser
        showEditModal={showEditModal}
        handleCloseEdit={handleCloseEdit}
        handleSubmitUserUpdate={handleSubmitUserUpdate}
        updatedUser={updatedUser}
        handleChangeUser={handleChangeUser}
        handleFileChange={handleFileChange}
      />

      <Addinfo
        showAddInfoModal={showAddInfoModal}
        handleCloseAddInfo={handleCloseAddInfo}
        handleAddEducation={handleAddEducation}
        education={education}
        setEducation={setEducation}
        handleAddWorkExperience={handleAddWorkExperience}
        workExperience={workExperience}
        setWorkExperience={setWorkExperience}
        handleAddSkills={handleAddSkills}
        skills={skills}
        handleChangeUser={handleChangeUser}
        setSkills={setSkills}
      />
      {/* <RegisterMDB /> */}
      {/* <CreateQuiz /> */}
    </div>
  );
};

export default Userinfo;

{
  /* <h1>Logged In User Information</h1> */
}
{
  /* <div className="card p-4 mt-5" style={{ textAlign: "start" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          CURRENT USER INFORMATION
        </h2>
        <Container>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Name:</strong>{" "}
            </Col>
            <Col>
              {user.firstName} {user.lastName}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Email:</strong>{" "}
            </Col>
            <Col>{user.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Username:</strong>{" "}
            </Col>
            <Col>{user.username}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Address:</strong>{" "}
            </Col>
            <Col>
              {user.address}, {user.city}, {user.province}, {user.country}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Education:</strong>{" "}
            </Col>
            <Col>
              {user.education} {user.degreeTitle}, {user.majorSubjects},{" "}
              {user.instituteName}, {user.startDate}-{user.endDate}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Marital Status:</strong>{" "}
            </Col>
            <Col>{user.maritalStatus}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Skills:</strong>{" "}
            </Col>
            <Col>
              {user.skilltitle},{user.skillLevel}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Work Experinence:</strong>{" "}
            </Col>
            <Col>
              {user.title}, {user.organization}, {user.fromDate} - {user.toDate}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs lg="4">
              <strong>Profile Image:</strong>{" "}
            </Col>
            <Col>
              <img
                src={"http://localhost:8000/" + user.profileImage}
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
            </Col>
          </Row>
        </Container>
        {/* <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p> 
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Address:</strong> {user.address}, {user.city}, {user.province}
          , {user.country}
        </p>
        <p>
          <strong>Education:</strong> {user.education} {user.degreeTitle},{" "}
          {user.majorSubjects}, {user.endDate} - {user.startDate},
          {user.instituteName}
        </p>
        <p>
          <strong>Marital Status:</strong> {user.maritalStatus}
        </p>
        <p>
          <strong>Skills:</strong> {user.skilltitle},{user.skillLevel}
        </p>
        <p>
          <strong>Work Experience:</strong> {user.title}, {user.organization},{" "}
          {user.fromDate} - {user.toDate}
        </p> 

        <p>
          <strong>Profile Image:</strong>{" "}
          <img
            src={"http://localhost:8000/" + user.profileImage}
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
        </p>
        <Button className="btn btn-primary mb-2" onClick={handleEdit}>
          Edit
        </Button>
        <Button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button className="btn btn-primary mt-2" onClick={handleAddMoreInfo}>
          Add More Info
        </Button>
      </div> */
}
