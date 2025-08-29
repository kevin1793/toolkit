import React from "react";
import ProjectsCard from "./ProjectsCard";
import ProjectsItem from "./ProjectsItem";

export default function ProjectsList({ projects, viewMode }) {
  return viewMode === "grid" ? (
    <div className="projects-grid">
      {projects.map((p) => (
        <ProjectsCard key={p.id} project={p} />
      ))}
    </div>
  ) : (
    <div className="projects-list">
      {projects.map((p) => (
        <ProjectsItem key={p.id} project={p} />
      ))}
    </div>
  );
}
