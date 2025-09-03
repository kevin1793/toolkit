import React, { use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetailsPage.css";
import { useEffect,useState } from "react";
import projectData from "../data/projects";

export default function ProjectDetailPage({ projects, currentUserId }) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  useEffect(() => {
    console.log('projects',projects)
    console.log('projectData',projectData)
    const findProject = projectData.find(
      (p) => p.id.toString() === projectId && p.userId === currentUserId
    );

    setProject(findProject);

    // if (!findProject) {
    //   navigate("/notfound");
    // }
  }, [project, navigate]);

  // Find the project for the current user
  

  if (!project) {
    return (
      <div className="project-detail-container">
        <h2>Project Not Found</h2>
        <button className="back-btn" onClick={() => navigate("/projects")}>
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <button className="back-btn" onClick={() => navigate("/projects")}>
        &larr; Back to Projects
      </button>

      <div className="project-detail-card">
        <div className="project-detail-image">
          {project.src ? (
            <img
              src={`https://source.unsplash.com/800x400/?${project.title
                .split(" ")
                .join(",")}`}
              alt={project.title}
            />
          ) : (
            <></>
          )}
        </div>

        <div className="project-detail-content">
          <h1>{project.title}</h1>
          <p className="project-description">{project.description}</p>

          <div className="project-info">
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Budget:</strong> ${project.budget.toLocaleString()}
            </p>
            <p>
              <strong>Start Date:</strong> {project.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {project.endDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
