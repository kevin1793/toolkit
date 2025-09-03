import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectsCreate from "../components/projects/ProjectsCreate";
import ProjectsList from "../components/projects/ProjectsList";
import { LayoutGrid, List } from "lucide-react";
import "../styles/ProjectsPage.css";

export default function ProjectsPage() {
  const userRole = "Homeowner";

  const dummyProjects = [
    {
      id: 1,
      title: "Kitchen Renovation",
      description: "Full remodel of kitchen with modern appliances, island, and lighting upgrades.",
      status: "In Progress",
      startDate: "2025-07-01",
      endDate: "2025-10-15",
      budget: 25000,
    },
    {
      id: 2,
      title: "Backyard Landscaping",
      description: "Design and install a patio, fire pit, and garden area with new sod.",
      status: "Planning",
      startDate: "2025-09-10",
      endDate: "2025-11-30",
      budget: 12000,
    },
    {
      id: 3,
      title: "Bathroom Upgrade",
      description: "Replace fixtures, add walk-in shower, and update flooring.",
      status: "Completed",
      startDate: "2025-05-01",
      endDate: "2025-06-20",
      budget: 8000,
    },
    {
      id: 4,
      title: "Roof Replacement",
      description: "Replace shingles, add insulation, and improve drainage.",
      status: "In Progress",
      startDate: "2025-08-01",
      endDate: "2025-09-25",
      budget: 15000,
    },
    {
      id: 5,
      title: "Home Office Build",
      description: "Convert spare bedroom into a modern home office with custom shelving.",
      status: "Planning",
      startDate: "2025-09-15",
      endDate: "2025-12-01",
      budget: 5000,
    },
  ];

  const [projects, setProjects] = useState(dummyProjects);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");

  // Apply filter by status
  const filteredProjects =
    statusFilter === "all"
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} />

      <main className="dashboard-main">
        {/* Header */}
        <div className="projects-header">
          <h1>Projects</h1>

          {/* View mode & New Project */}
          <div className="projects-actions">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Card View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List View"
            >
              <List size={18} />
            </button>
            <button
              className="new-project-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "New Project"}
            </button>
          </div>
        </div>

        {/* Status filter row */}
        <div className="projects-filters">
          <button
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All ({projects.length})
          </button>

          <button
            className={`filter-btn ${statusFilter === "Planning" ? "active" : ""}`}
            onClick={() => setStatusFilter("Planning")}
          >
            New ({projects.filter((p) => p.status === "Planning").length})
          </button>

          <button
            className={`filter-btn ${statusFilter === "In Progress" ? "active" : ""}`}
            onClick={() => setStatusFilter("In Progress")}
          >
            In Progress ({projects.filter((p) => p.status === "In Progress").length})
          </button>

          <button
            className={`filter-btn ${statusFilter === "Completed" ? "active" : ""}`}
            onClick={() => setStatusFilter("Completed")}
          >
            Completed ({projects.filter((p) => p.status === "Completed").length})
          </button>
        </div>


        {/* New Project Form */}
        {showForm && (
          <ProjectsCreate
            onCreate={(project) =>
              setProjects([...projects, { ...project, id: Date.now() }])
            }
          />
        )}

        {/* Projects List */}
        <ProjectsList projects={filteredProjects} viewMode={viewMode} />
      </main>
    </div>
  );
}
