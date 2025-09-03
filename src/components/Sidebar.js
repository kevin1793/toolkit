import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  // Define pages available per role
  const routes = {
    Homeowner: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Projects", path: "/projects" },
      { name: "Profile", path: "/profile" },
      { name: "Contractors", path: "/contractors" }

    ],
    Contractor: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Jobs", path: "/jobs" },
      { name: "Profile", path: "/profile" }
    ],
    Admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Users", path: "/users" },
      { name: "Settings", path: "/settings" },
    ]
  };

  const pages = routes[role] || [];

  const handleLogout = async () => {
    try {
      navigate("/"); // redirect to login after logout
      await signOut(auth);

    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>HRC Toolkit</h2>
      </div>
      <nav className="sidebar-nav">
        {pages.map((page) => (
          <Link key={page.path} to={page.path} className="sidebar-link">
            {page.name}
          </Link>
        ))}
        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
