import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectsCreate from "../components/projects/ProjectsCreate";
import ProjectsList from "../components/projects/ProjectsList";
import ProjectsCard from "../components/projects/ProjectsCard";
import "../styles/ProjectsPage.css";

export default function ProjectsPage() {
  const userRole = "Homeowner";
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} />
      <main className="dashboard-main">
        <div className="projects-header">
          <h1>Projects</h1>
          <div className="projects-actions">
            <button onClick={() => setViewMode("grid")}>Card View</button>
            <button onClick={() => setViewMode("list")}>List View</button>
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "New Project"}
            </button>
          </div>
        </div>

        {showForm && (
          <ProjectsCreate
            onCreate={(project) => setProjects([...projects, project])}
          />
        )}

        <ProjectsList projects={projects} viewMode={viewMode} />
      </main>
    </div>
  );
}
