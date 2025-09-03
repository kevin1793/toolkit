import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectsCard({ project, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if clicking Edit/Delete
    if (e.target.tagName !== "BUTTON") {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <div className="project-card" onClick={handleCardClick}>
      {/* Project Image */}
      <div className="project-card-image">
        {project.src?<img
          src={project.src || `https://source.unsplash.com/400x250/?${project.title.split(" ").join(",")}`}
          alt={project.title}
        />: <></>}
      </div>

      {/* Card Content */}
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <small>Status: {project.status}</small>
        <small>
          {project.startDate} → {project.endDate}
        </small>
        <small>Budget: ${project.budget.toLocaleString()}</small>
      </div>

      {/* Footer Actions */}
      <div className="card-footer">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
