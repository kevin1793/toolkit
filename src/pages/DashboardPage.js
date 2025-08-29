import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  // Example: pass role dynamically (could come from context or auth)
  const userRole = "Homeowner";

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} />

      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <p>Welcome, {userRole}! This is your dashboard overview.</p>
      </main>
    </div>
  );
}
