import React from 'react'
import Sidebar from "../components/Sidebar";
export default function Employee() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Employee <span>&#x25B2;</span>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Utilization <span>&#x25B2;</span>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Status <span>&#x25B2;</span>
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">Manage</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-4 border-b border-gray-200">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://via.placeholder.com/40"
                            alt="Employee"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Employee Name
                          </div>
                          <div className="text-sm text-gray-500">
                            Designation
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">
                      25%
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">
                      <div className="text-sm text-gray-900">Worker</div>
                      <div className="text-sm text-gray-500">2 months</div>
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200 text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L10 7.172 6.414 3.586a2 2 0 10-2.828 2.828L7.172 10 3.586 13.586a2 2 0 102.828 2.828L10 12.828l3.586 3.586a2 2 0 102.828-2.828L12.828 10l3.586-3.586a2 2 0 000-2.828z" />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 00-2 0v1H7a1 1 0 000 2h1v5a1 1 0 102 0v-5h1a1 1 0 000-2h-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
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
