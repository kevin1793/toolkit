// ProfilePage.js
import React, { useState,useEffect } from "react";
import "../styles/ProfilePage.css";
import Sidebar from "../components/Sidebar";
import {getCurrentUserRecord} from "../services/firebaseUtil.js";


const ProfilePage = () => {
  const userRole = "Homeowner";

  useEffect(() => {
    const fetchUserData = async () => {
      const userRecord = await getCurrentUserRecord();
      if (userRecord) {
        console.log("Fetched user data:", userRecord);
        setFormData(userRecord);
      }
    };
    fetchUserData();
  }, []);


  // Initial form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can replace this with your API call or state management logic
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} />

      <main className="dashboard-main">
        <h1>Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Save Profile</button>
        </form>
      </main>
    </div>
    
  );
};

export default ProfilePage;
