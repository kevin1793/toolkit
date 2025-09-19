import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectsItem({ project, onEdit, onDelete, refetchProjects }) {
  const navigate = useNavigate();

  const handleRowClick = (e) => {
    // Prevent navigation if clicking Edit/Delete buttons
    if (e.target.tagName !== "BUTTON") {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <div className="project-list-item" onClick={handleRowClick}>
      <div className="project-list-content">
        <h3>{project.title || project.name}</h3>
        <p>{project.description}</p>
        {project.budget && <p>Budget: ${project.budget.toLocaleString()}</p>}
        <small>Status: {project.status || "New"}</small>
        <small>
          {project.startDate} → {project.endDate}
        </small>
      </div>

      {/* Footer Actions */}
      <div className="card-footer">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
