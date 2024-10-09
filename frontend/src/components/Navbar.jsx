import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar({ handleEdit, handleDelete, handleAddMoreInfo, handleLogout }) {
  return (
    <div>
      <Navbar className="bg-body-tertiary bg-primary-subtle">
        <Container>
          <Navbar.Brand>
            <Button className="btn btn-primary me-2" onClick={handleEdit}>
              Edit
            </Button>
            <Button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              className="btn btn-secondary ms-2"
              onClick={handleAddMoreInfo}
            >
              Add More Info
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar>
              <Link to="/users">
                <Button variant="outline-success">View All Users</Button>
              </Link>
              <Button className="btn btn-warning mx-2 " onClick={handleLogout}>
                Logout
              </Button>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbar;
