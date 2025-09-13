import React, { useState } from "react";
import "../styles/SignupPage.css";
import {createProfile,createUserWithEmailPassword} from "../services/firebaseUtil.js";

export default function SignupPage() {
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    if(formData.password !== formData.confirmPassword){
      setError("Passwords do not match");
      return;
    }
    // Add your signup logic here
    createUserWithEmailPassword(formData.email, formData.password, formData)
      .then((user) => {
        console.log("User created:", user);
        // Optionally, create a profile document
        createProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          userType: formData.userType,
          email: formData.email
        }).then(() => {
          setError("success");
          // clear form data
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            userType: "Homeowner",
            password: "",
            confirmPassword: ""
          });
        })
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
          setError("Email already in use");
        }else if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          setError("Password should be at least 6 characters");
        }else{
          setError("Signup failed");
        }
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && error !== "success" && <p className="form-error">{error}</p>}
          {error === "success" && <p className="form-success">User created successfully! Please log in.</p>}
          <div className="form-group">
            {/* <label>First Name</label> */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <label>Last Name</label> */}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
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
