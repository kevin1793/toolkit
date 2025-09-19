import React, { useState } from "react";
import "../../styles/ProjectsPage.css";
import { auth,db  } from "../../services/firebase";
import { addRecordToCollection } from "../../services/firebaseUtil";

export default function ProjectsCreate({ onCreate }) {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    budget: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const updatedProject = { ...newProject, [e.target.name]: e.target.value };
    setNewProject(updatedProject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.description) return;
    const updatedProject = { ...newProject, userId: auth.currentUser.uid };
    addRecordToCollection("Projects", updatedProject);
    onCreate(); // Notify parent to refresh the list
    setNewProject({ name: "", description: "", budget: "", zipCode: "" });
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
      <input
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={newProject.zipCode}
        onChange={handleChange}
      />
      <button type="submit">Create Project</button>
    </form>
  );
}
