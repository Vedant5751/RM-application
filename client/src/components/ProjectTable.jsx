import React, { useState, useEffect } from "react";
import ProjectInfo from "./ProjectInfo";
import ProjectForm from "./ProjectForm";

export default function ProjectTable({ searchQuery }) {
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of projects per page

  useEffect(() => {
    fetch("https://chic-enthusiasm-production.up.railway.app/project")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `https://chic-enthusiasm-production.up.railway.app/project/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Project deleted successfully!");
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.project_id !== projectId)
        ); // Update state to remove deleted project
      } else {
        const error = await response.json();
        alert(`Failed to delete project: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Slice projects for the current page
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="relative overflow-x-auto p-2 sm:rounded-lg">
        <table className="w-full text-left rtl:text-right ">
          <thead className="uppercase bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Project Name
              </th>
              <th scope="col" className="px-6 py-3">
                Project Manager
              </th>
              <th scope="col" className="px-6 py-3">
                Business Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjects.map((project) => (
              <tr
                key={project.project_id}
                className="hover:bg-gray-600 dark:bg-gray-400 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {project.project_name}
                </th>
                <td className="px-6 py-4">{project.project_manager_name}</td>
                <td className="px-6 py-4">{project.project_owning_bu}</td>
                <td className="px-6 py-4">{project.country}</td>
                <td className="flex justify-center px-6 py-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="hover:bg-green-400 mt-2 px-6 py-2 mr-2 border rounded bg-green-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.project_id)}
                    className="hover:bg-red-500 mt-2 px-4 py-2 border rounded bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedProject && (
          <ProjectInfo
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {showProjectForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
              <ProjectForm onClose={() => setShowProjectForm(false)} />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
