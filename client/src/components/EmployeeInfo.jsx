import React from 'react';

export default function EmployeeInfoModal({ employee, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          Close
        </button>
        <div className="flex">
          <div className="w-1/4 p-4">
            <img
              src={employee.profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-full rounded-full"
            />
            <h2 className="mt-4 text-xl font-bold">{employee.name}</h2>
            <p className="text-gray-500">{employee.position}</p>
          </div>
          <div className="w-3/4 p-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <div className="flex items-center">
                <p className="text-gray-500 mr-4">Added on {employee.addedDate}</p>
                <button className="text-red-600 hover:text-red-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4">
              <nav className="flex space-x-4">
                <button className="text-blue-500 border-b-2 border-blue-500 pb-1">
                  Profile
                </button>
                <button className="text-gray-500">Feeds</button>
                <button className="text-gray-500">Goals</button>
                <button className="text-gray-500">Leave</button>
                <button className="text-gray-500">Approval</button>
              </nav>
              <div className="mt-4">
                <div>
                  <p><strong>Employee Id:</strong> {employee.id}</p>
                  <p><strong>Email Id:</strong> {employee.email}</p>
                  <p><strong>Work Location:</strong> {employee.location}</p>
                  <p><strong>Extension:</strong> {employee.extension}</p>
                  <p><strong>Mobile:</strong> {employee.mobile}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Skill Set</h3>
                  <div>
                    {employee.skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <p className="w-1/4">{skill.name}</p>
                        <div className="w-3/4 bg-gray-200 h-4 rounded">
                          <div
                            className={`h-4 rounded ${skill.level === 'high' ? 'bg-green-500' : skill.level === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
