import React from "react";

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
            <h2 className="mt-4 text-xl font-bold">{employee.employee_name}</h2>
            <p className="text-gray-500">{employee.desgnation}</p>
          </div>
          {/* <div className="w-3/4 p-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <div className="flex items-center">
                <p className="text-gray-500 mr-4">
                  Added on {employee.addedDate}
                </p>
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
                  <p>
                    <strong>Employee Id:</strong> {employee.id}
                  </p>
                  <p>
                    <strong>Email Id:</strong> {employee.email}
                  </p>
                  <p>
                    <strong>Work Location:</strong> {employee.location}
                  </p>
                  <p>
                    <strong>Extension:</strong> {employee.extension}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {employee.mobile}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Skill Set</h3>
                  <div>
                    {employee.skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <p className="w-1/4">{skill.name}</p>
                        <div className="w-3/4 bg-gray-200 h-4 rounded">
                          <div
                            className={`h-4 rounded ${
                              skill.level === "high"
                                ? "bg-green-500"
                                : skill.level === "medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* reference of everything that is available */}
          <div>
            <div>employee_id: {employee.employee_id}</div>
            <div>employee_name: {employee.employee_name}</div>
            <div>designation: {employee.designation}</div>
            <div>bu: {employee.bu}</div>
            <div>doj: {employee.doj}</div>
            <div>year_of_joining: {employee.year_of_joining}</div>
            <div>dob: {employee.dob}</div>
            <div>location: {employee.location}</div>
            <div>offshore_onsite: {employee.offshore_onsite}</div>
            <div>project: {employee.project}</div>
            <div>sub_project: {employee.sub_project}</div>
            <div>
              project_remarks_from_bu: {employee.project_remarks_from_bu}
            </div>
            <div>project_start_date: {employee.project_start_date}</div>
            <div>project_end_date: {employee.project_end_date}</div>
            <div>billed: {employee.billed}</div>
            <div>unbilled_days: {employee.unbilled_days}</div>
            <div>allocation_start_date: {employee.allocation_start_date}</div>
            <div>allocation_end_date: {employee.allocation_end_date}</div>
            <div>bilingual: {employee.bilingual}</div>
            <div>language_level: {employee.language_level}</div>
            <div>primary_skill: {employee.primary_skill}</div>
            <div>secondary_skill: {employee.secondary_skill}</div>
            <div>
              srm_experience_in_years: {employee.srm_experience_in_years}
            </div>
            <div>previous_experience: {employee.previous_experience}</div>
            <div>overall_experience: {employee.overall_experience}</div>
            <div>certification: {employee.certification}</div>
            <div>certification_2: {employee.certification_2}</div>
            <div>appraisal_rating_2023: {employee.appraisal_rating_2023}</div>
            <div>bill_rate: {employee.bill_rate}</div>
            <div>ctc: {employee.ctc}</div>
            <div>separation_date: {employee.separation_date}</div>
            <div>remarks: {employee.remarks}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
