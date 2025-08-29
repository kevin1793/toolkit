import React, { useState } from "react";
import "../../styles/ProjectsPage.css";

export default function ProjectsCreate({ onCreate }) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description) return;
    const project = { ...newProject, id: Date.now() };
    onCreate(project);
    setNewProject({ name: "", description: "", budget: "" });
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Project Name"
        value={newProject.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={newProject.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="budget"
        placeholder="Budget ($)"
        value={newProject.budget}
        onChange={handleChange}
      />
      <button type="submit">Create Project</button>
    </form>
  );
}
