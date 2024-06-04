import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import ProjectForm from "../components/ProjectForm"; // Adjust the import path as needed

export default function Project() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddProjectClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
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
                <a href="#" className="text-purple-600">
                  User
                </a>
                <a href="#" className="text-gray-600">
                  Department
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded flex items-center space-x-2"
                  onClick={handleAddProjectClick}
                >
                  Add Project <span className="text-lg font-bold">+</span>
                </button>
                <button className="p-2 border rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.993.883L11 4v12a1 1 0 01-1.993.117L9 16V4a1 1 0 011-1zm5 6a1 1 0 01.993.883L16 10v4a1 1 0 01-1.993.117L14 14v-4a1 1 0 011-1zm-10 0a1 1 0 01.993.883L6 10v2a1 1 0 01-1.993.117L4 12v-2a1 1 0 011-1zm0-3a1 1 0 01.993.883L6 7v2a1 1 0 01-1.993.117L4 9V7a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3.293 4.293a1 1 0 011.414 0L10 9.586l5.293-5.293a1 1 0 111.414 1.414L11.414 11l5.293 5.293a1 1 0 01-1.414 1.414L10 12.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 11 3.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
            {isFormVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-11/12 h-11/12 overflow-y-auto">
                  <ProjectForm onClose={handleCloseForm} />
                </div>
              </div>
            )}
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Project Name
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Estimated Hours
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Logged Hours
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">Status</th>
                  <th className="px-4 py-2 border-b border-gray-200">Jobs</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      Project{index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">—</td>
                    <td className="px-4 py-2 border-b border-gray-200">—</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
