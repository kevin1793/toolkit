import React, { useState } from "react";
import "../styles/SignupPage.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    userType: "Homeowner",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    // Add your signup logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            {/* <label>First Name</label> */}
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <label>Last Name</label> */}
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* User Type Radio Buttons */}
          <div className="form-group">
            <label>User Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="Homeowner"
                  checked={formData.userType === "Homeowner"}
                  onChange={handleChange}
                />
                Homeowner
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="Contractor"
                  checked={formData.userType === "Contractor"}
                  onChange={handleChange}
                />
                Contractor
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
