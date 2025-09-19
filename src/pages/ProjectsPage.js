import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectsCreate from "../components/projects/ProjectsCreate";
import ProjectsList from "../components/projects/ProjectsList";
import { LayoutGrid, List } from "lucide-react";
import "../styles/ProjectsPage.css";
import { deleteRecordFromCollection, getAllRecordsFromCollectionByUserID } from "../services/firebaseUtil";
import DeleteConfirmationModal from "./../components/DeleteConfirmation"; // Import your modal component

export default function ProjectsPage() {
  const userRole = "Homeowner";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Close the confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const openDeleteModal = (projectId) => {
    console.log("Opening delete modal on project PAGE:", projectId);
    setProjectId(projectId);
    setIsModalOpen(true);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);  // Start loading state
      const data = await getAllRecordsFromCollectionByUserID("Projects");
      console.log("Fetched Projects:", data); // Log the data for debugging

      setProjects(data || []);  // Set the projects state with fetched data
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects.");  // Set error state
    } finally {
      setLoading(false);  // End loading state
    }
  };

  const onDelete = async () => {
    console.log("=====onDelete called with projectId:", projectId);
    if (!projectId) {
      console.error("Invalid project ID for deletion:", projectId);
      return;
    }
    try {
      console.log("Deleting project with ID:", projectId);

      // Call the delete function from Firebase
      await deleteRecordFromCollection("Projects", projectId);

      // After successful deletion, update the state (remove the project from the list)
      fetchProjects();
      closeModal();
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

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
              <LayoutGrid size={18} refetchProjects={fetchProjects}/>
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List View"
            >
              <List size={18} refetchProjects={fetchProjects} onDelete={openDeleteModal} />
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
            New ({projects.filter((p) => p.status === "Planning").length  || 0})
          </button>

          <button
            className={`filter-btn ${statusFilter === "In Progress" ? "active" : ""}`}
            onClick={() => setStatusFilter("In Progress")}
          >
            In Progress ({projects.filter((p) => p.status === "In Progress").length || 0})
          </button>

          <button
            className={`filter-btn ${statusFilter === "Completed" ? "active" : ""}`}
            onClick={() => setStatusFilter("Completed")}
          >
            Completed ({projects.filter((p) => p.status === "Completed").length  || 0})
          </button>
        </div>


        {/* New Project Form */}
        {showForm && (
          <ProjectsCreate
            onCreate={() => fetchProjects()}
          />
        )}

        {/* Projects List */}
        <ProjectsList projects={filteredProjects} viewMode={viewMode} onDelete={openDeleteModal} refetchProjects={fetchProjects} />
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={onDelete}
        />
      </main>
    </div>
  );
}
