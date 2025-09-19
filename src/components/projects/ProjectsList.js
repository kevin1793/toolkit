import React from "react";
import ProjectsCard from "./ProjectsCard";
import ProjectsItem from "./ProjectsItem";

export default function ProjectsList({
  projects,
  viewMode,
  onEdit,
  onDelete,
  refetchProjects
}) {
  return viewMode === "grid" ? (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectsCard
          openDeleteModal={onDelete} // Pass the openDeleteModal function
          refetchProjects={refetchProjects}
          key={project.id}
          project={project}
          onEdit={() => onEdit && onEdit(project.id)}
          onDelete={() => onDelete && onDelete(project.id)}
        />
      ))}
    </div>
  ) : (
    <div className="projects-list">
      {projects.map((project) => (
        <ProjectsItem
          key={project.id}
          project={project}
          onEdit={() => onEdit && onEdit(project.id)}
          openDeleteModal={onDelete} // Pass the openDeleteModal function
          refetchProjects={refetchProjects}
        />
      ))}
    </div>
  );
}
