import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  const [formData, setFormData] = useState({
    userType: "Teacher",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    address: "",
    city: "",
    province: "Punjab",
    zip: "",
    country: "",
    maritalStatus: "Married",
    education: "Matric",
    profileImage: null,
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData.userType);
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newForm = new FormData();
      newForm.append("userType", formData.userType);
      newForm.append("firstName", formData.firstName);
      newForm.append("lastName", formData.lastName);
      newForm.append("email", formData.email);
      newForm.append("username", formData.username);
      newForm.append("password", formData.password);
      newForm.append("address", formData.address);
      newForm.append("city", formData.city);
      newForm.append("province", formData.province);
      newForm.append("zip", formData.zip);
      newForm.append("country", formData.country);
      newForm.append("maritalStatus", formData.maritalStatus);
      newForm.append("education", formData.education);
      newForm.append("profileImage", formData.profileImage);
      // console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/create",
        newForm
      );

      if (response.status === 200) {
        alert("User registered successfully!");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="container mx-auto my-3 bg-success-subtle p-2"
      style={{
        width: "700px",
        background: "linear-gradient(120deg,#2980b9, #8e44ad)",
      }}
    >
      <h1>REGISTER FORM</h1>
      <form
        className="row g-4 needs-validation text-start mx-auto"
        enctype="multipart/form-data"
        novalidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-12">
          <label htmlFor="userType" className="form-label fw-bold">
            UserType
          </label>
          <select
            className="form-select"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label fw-bold">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label fw-bold">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="address" className="form-label fw-bold">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="city" className="form-label fw-bold">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="province" className="form-label fw-bold">
            Province
          </label>
          <select
            className="form-select"
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          >
            <option value="Sindh">Sindh</option>
            <option value="Punjab">Punjab</option>
            <option value="Balochistan">Balochistan</option>
            <option value="KPK">KPK</option>
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="zip" className="form-label fw-bold">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            maxLength={4}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="country" className="form-label fw-bold">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="maritalStatus" className="form-label fw-bold">
            Marital Status
          </label>
          <select
            className="form-select"
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="education" className="form-label fw-bold">
            Education
          </label>
          <select
            className="form-select"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
          </select>
        </div>

        <div className="col-md-12">
          <label htmlFor="profileImage" className="form-label fw-bold">
            Profile Image
          </label>
          <input
            type="file"
            className="form-control"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="col-12" style={{ width: "100%" }}>
          <button className="btn btn-primary float-end" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
