import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeInfoModal from "../components/EmployeeInfo";
import EmployeeForm from "../components/EmployeeForm";
import { exportToExcel } from "../utils/exportData";

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

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
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredEmployees = allEmployee.filter((employee) =>
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="mb-5 mx-auto">
            <div className="grid grid-cols-6 mb-4">
              <div className="col-span-1">
                <button className="px-4 py-2 border rounded bg-white text-gray-700">
                  Employees
                </button>
              </div>
              <div className="col-span-3 ">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by employee name"
                  className="px-4 py-2 border rounded bg-white text-gray-700 w-1/3"
                />
              </div>
              <div className="col-span-2 mx-auto flex">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                >
                  Add Employee +
                </button>
                <button
                  type="button"
                  onClick={() => exportToExcel(allEmployee, "EmployeeData")}
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Export Data
                </button>
              </div>
            </div>
            <div className="grid grid-cols-6"></div>
          </div>
          <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 ">
                <tr className="text-justify">
                  <th className="px-4 py-2 border-b border-gray-200">
                    Employee
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">
                    Utilization
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200">Status</th>
                  <th className="text-center px-4 py-2 border-b border-gray-200">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-4 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="">
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
                    <td className="justify-center flex px-4 py-4 border-b border-gray-200 text-right">
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="hover:bg-green-400 mt-2 px-6 py-2 mr-2 border rounded bg-green-700 text-white"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <EmployeeForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}
