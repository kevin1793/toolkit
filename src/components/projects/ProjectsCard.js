import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProjectsCard({ project, onEdit, onDelete, refetchProjects}) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if clicking Edit/Delete
    if (e.target.tagName !== "BUTTON") {
      navigate(`/projects/${project.id}`);
    }
  };

  
  const handleDeleteClick = (e) => {
    console.log("Delete clicked for project id:", project.id);
    e.stopPropagation(); // Prevent card click
    if (onDelete) {
      onDelete(project);
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
        <h3>{project.title || project.name}</h3>
        <p>{project.description}</p>
        <small>Status: {project.status  || "New"}<br></br></small>
        <small>
          Start: {project.startDate || 'TBD'} → End: {project.endDate || 'TBD'}<br></br>
        </small>
        <small>Budget: ${project.budget ? project.budget.toLocaleString() : "N/A"}<br></br></small>
      </div>

      {/* Footer Actions */}
      <div className="card-footer">
        <button onClick={onEdit}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      
    </div>
  );
}
