import React from "react";

export default function ProjectsItem({ project }) {
  return (
    <div className="project-list-item">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {project.budget && <p>Budget: ${project.budget}</p>}
    </div>
  );
}
