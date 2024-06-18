import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm"; // Adjust the import path as needed

export default function Project() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://chic-enthusiasm-production.up.railway.app/project")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="px-4 py-2 border rounded bg-white text-gray-700">
                    Projects{" "}
                    <span className="inline-block transform rotate-90">
                      &#x25BE;
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded flex items-center space-x-2"
                  onClick={() => setShowForm(true)}
                >
                  Add Project <span className="text-lg font-bold">+</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border p-4 rounded shadow">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p>{project.description}</p>
                  <p>{project.status}</p>
                  <p>{project.startDate}</p>
                  <p>{project.endDate}</p>
                </div>
              ))}
            </div>
          </div>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
                <ProjectForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
