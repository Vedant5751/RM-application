import React, { useState, useEffect } from "react";

export default function ProjectTable() {

  const [projects, setProjects] = useState([]);

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
        setProjects(
          projects.filter((project) => project.project_id !== projectId)
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

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left rtl:text-right ">
          <thead className=" uppercase bg-gray-700 dark:text-gray-400">
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
          {projects.map((project) => (
            <tbody>
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
                    onClick={() => deleteAccount(project.project_id)}
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
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
