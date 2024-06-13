//eslint-disable-next-line
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeInfoModal from "../components/EmployeeInfo";

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    designation: "",
    bu: "",
    doj: "",
    year_of_joining: "",
    dob: "",
    location: "",
    offshore_onsite: "",
    project: "",
    sub_project: "",
    project_remarks_from_bu: "",
    project_start_date: "",
    project_end_date: "",
    billed: "",
    unbilled_days: "",
    allocation_start_date: "",
    allocation_end_date: "",
    bilingual: "",
    language_level: "",
    primary_skill: "",
    secondary_skill: "",
    srm_experience_in_years: "",
    previous_experience: "",
    overall_experience: "",
    certification: "",
    certification_2: "",
    appraisal_rating_2023: "",
    ctc: "",
    separation_date: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch(
          "https://chic-enthusiasm-production.up.railway.app/employee"
        );
        const result = await response.json();
        setAllEmployee(result);
        console.log("Data Fetched");
      } catch (err) {
        console.log(err);
      }
    };

    fetchingData();
  }, [setAllEmployee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const newEmployee = await response.json();
        setAllEmployee((prevEmployees) => [...prevEmployees, newEmployee]);
        setShowForm(false);
        setFormData({
          employee_id: "",
          employee_name: "",
          designation: "",
          bu: "",
          doj: "",
          year_of_joining: "",
          dob: "",
          location: "",
          offshore_onsite: "",
          project: "",
          sub_project: "",
          project_remarks_from_bu: "",
          project_start_date: "",
          project_end_date: "",
          billed: "",
          unbilled_days: "",
          allocation_start_date: "",
          allocation_end_date: "",
          bilingual: "",
          language_level: "",
          primary_skill: "",
          secondary_skill: "",
          srm_experience_in_years: "",
          previous_experience: "",
          overall_experience: "",
          certification: "",
          certification_2: "",
          appraisal_rating_2023: "",
          ctc_per_anum: "",
          ctc_per_month: "",
          separation_date: "",
          remarks: "",
        });
      } else {
        console.log("Failed to add employee");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className=" mb-5 mx-auto">
            <div className="grid grid-cols-6">
              <div className="col-span-5 ">
                <button className="px-4 py-2 border rounded bg-white text-gray-700">
                  Employees
                </button>
              </div>
              <div className="col-span-1  mx-auto">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Employee +
                </button>
              </div>
            </div>
          </div>
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
                {allEmployee.map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <td className="px-4 py-4 border-b border-gray-200">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={employee.profileImage}
                            alt={employee.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.employee_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.designation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-b border-gray-200">25%</td>
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
      {selectedEmployee && (
        <EmployeeInfoModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
            <h2 className="text-xl mb-4">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {key.replace(/_/g, " ")}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
