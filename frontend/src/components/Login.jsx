import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
// import RegisterMDB from "./RegisterMDB";

export default function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        userType,
        username,
        password,
      });
      // console.log("Login Response:", response.data);
      if (response.status === 200) {
        const userId = response.data.user._id;
        const token = response.data.token;
        const userType = response.data.user.userType;
        // console.log(token);
        if (userId) {
          localStorage.setItem("id", userId);
          localStorage.setItem("token", token);
          localStorage.setItem("userType", userType);
          // console.log("Stored User ID:", userId);
          navigate("/");
        }
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div
      className="container bg-secondary mx-auto mt-5  p-2"
      style={{
        width: "500px",
        borderRadius: "10px",
        background: "linear-gradient(120deg,#2980b9, #8e44ad)",
      }}
    >
      <h1
        style={{
          textTransform: "uppercase",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: "rgb(205, 247, 217)",
        }}
      >
        Login
      </h1>
      <form
        className="row g-4 needs-validation text-start px-5 py-3"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="col-md-12">
          <label
            htmlFor="validationCustom00"
            className="form-label fw-bold"
            style={{ color: "white" }}
          >
            Usertype
          </label>
          <select
            className="form-select"
            id="validationCustom00"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select UserType
            </option>
            <option>Teacher</option>
            <option>Admin</option>
            <option>Student</option>
          </select>
        </div>

        <div className="col-md-12">
          <label
            htmlFor="validationCustom02"
            className="fw-bold form-label"
            style={{ color: "white" }}
          >
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="col-md-12">
          <label
            htmlFor="validationCustom0"
            className="form-label fw-bold"
            style={{ color: "white" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="validationCustom0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-grid gap-2">
          <button
            className="btn"
            type="submit"
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              backgroundColor: "aquamarine",
            }}
          >
            Login
          </button>
        </div>
      </form>
      <p style={{ color: "white" }}>
        Don't have an account?
        <Link to="/register">
          <Button variant="success" size="sm">
            Register
          </Button>
        </Link>
      </p>

      {/* <RegisterMDB /> */}
    </div>
  );
}
