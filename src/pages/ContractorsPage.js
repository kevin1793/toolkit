import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ContractorsCard from "../components/contractors/ContractorsCard";
import ContractorsItem from "../components/contractors/ContractorsItem";
import "../styles/ContractorsPage.css";

// Dummy contractors data
const contractorsData = [
  {
    id: 1,
    name: "Ace Renovations",
    specialty: "Kitchen & Bathroom Remodeling",
    rating: 4.8,
    reviews: 34,
    location: "New York, NY",
    priceRange: "$50-$100/hr",
    image: "https://picsum.photos/400/260"
  },
  {
    id: 2,
    name: "TopBuild Contractors",
    specialty: "Home Additions & Extensions",
    rating: 4.5,
    reviews: 21,
    location: "Los Angeles, CA",
    priceRange: "$60-$120/hr",
    image: "https://picsum.photos/400/240"
  },
  {
    id: 3,
    name: "Quality Home Services",
    specialty: "Roofing & Exterior",
    rating: 4.7,
    reviews: 18,
    location: "Chicago, IL",
    priceRange: "$45-$90/hr",
    image: "https://picsum.photos/400/255"
  },
  {
    id: 4,
    name: "Elite Interiors",
    specialty: "Interior Design & Renovation",
    rating: 4.9,
    reviews: 40,
    location: "Miami, FL",
    priceRange: "$70-$150/hr",
    image: "https://picsum.photos/400/220"
  }
];

export default function ContractorsPage() {
  const userRole = "Homeowner"; // example role for Sidebar
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} />

      <main className="dashboard-main">
        <div className="contractors-header">
          <h1>Contractors</h1>
          <div className="contractors-actions">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="contractors-grid">
            {contractorsData.map((contractor) => (
              <ContractorsCard key={contractor.id} contractor={contractor} />
            ))}
          </div>
        ) : (
          <div className="contractors-list">
            {contractorsData.map((contractor) => (
              <ContractorsItem key={contractor.id} contractor={contractor} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
