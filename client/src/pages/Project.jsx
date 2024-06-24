import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm"; // Adjust the import path as needed
import ProjectTable from "../components/ProjectTable";

export default function Project() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="grid grid-cols-6 mb-4">
            <div className="col-span-5">
              <button className="px-4 py-2 border rounded bg-white text-gray-700">
                Projects
                <span className="inline-block transform rotate-90">
                  &#x25BE;
                </span>
              </button>
            </div>
            <div className="col-span-1 mx-auto">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Project +
              </button>
            </div>
          </div>

          <div>
            <ProjectTable />
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
