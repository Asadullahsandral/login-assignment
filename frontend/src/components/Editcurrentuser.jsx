import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import { Form } from "react-router-dom";

function Editcurrentuser({
  showEditModal,
  handleCloseEdit,
  handleSubmitUserUpdate,
  updatedUser,
  handleChangeUser,
  handleFileChange,
}) {
  return (
    <Modal show={showEditModal} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitUserUpdate}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleChangeUser}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleChangeUser}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChangeUser}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChangeUser}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updatedUser.address}
              onChange={handleChangeUser}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMaritalStatus">
            <Form.Label>Marital Status</Form.Label>
            <Form.Select
              type="text"
              name="maritalStatus"
              value={updatedUser.maritalStatus}
              onChange={handleChangeUser}
              required
            >
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="profileImage">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="profileImage"
              // value={"http://localhost:8000/" + updatedUser.profileImage}
              onChange={handleFileChange}
              required
            />
            {updatedUser.profileImage && (
              <img
                src={`http://localhost:8000/${updatedUser.profileImage}`}
                alt="Current Profile"
                style={{ width: "50px", marginTop: "10px" }}
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Editcurrentuser;
