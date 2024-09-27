import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeInfoModal from "../components/EmployeeInfo";
import EmployeeForm from "../components/EmployeeForm";
import { exportToExcel } from "../utils/exportData";
import * as XLSX from "xlsx"; // Import XLSX to read Excel files

export default function Employee() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming employee data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        raw: false, // Parse cells according to their type (important for dates)
      });

      // Convert date fields manually if they are in numeric format
      const formattedWorksheet = worksheet.map((row) => {
        for (let key in row) {
          if (typeof row[key] === "number" && isDateField(key)) {
            // Convert numeric date to a readable format
            row[key] = XLSX.SSF.format("yyyy-mm-dd", row[key]);
          }
        }
        return row;
      });

      // Send data to backend to add employees to the database one by one
      addEmployeesToDatabaseOneByOne(formattedWorksheet);
    };

    reader.readAsArrayBuffer(file);
  };

  // Helper function to check if a field is a date field
  const isDateField = (fieldName) => {
    const dateFields = [
      "doj", // Date of Joining
      "dob", // Date of Birth
      "project_start_date", // Project Start Date
      "project_end_date", // Project End Date
      "allocation_start_date", // Allocation Start Date
      "allocation_end_date", // Allocation End Date
      "separation_date", // Separation Date
    ];
    return dateFields.includes(fieldName);
  };

  // Function to add employees to the database one by one
  const addEmployeesToDatabaseOneByOne = async (employees) => {
    for (const employee of employees) {
      // Map billed and bilingual to single character values
      employee.billed =
        employee.billed && employee.billed.toLowerCase() === "billed"
          ? "Y"
          : "N"; // Assuming 'Billed' means they are billed
      employee.bilingual =
        employee.bilingual && employee.bilingual.toLowerCase() === "yes"
          ? "Y"
          : "N"; // Assuming 'Yes' means bilingual

      try {
        const response = await fetch(
          "https://chic-enthusiasm-production.up.railway.app/employee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Failed to add employee: ${employee.employee_name}. Error: ${errorText}`
          );
          alert(
            `Failed to add employee: ${employee.employee_name}. Error: ${errorText}`
          );
        }
      } catch (error) {
        console.error(
          `Error adding employee: ${employee.employee_name}`,
          error
        );
        alert(
          `Error adding employee: ${employee.employee_name}. Error: ${error.message}`
        );
      }
    }
  };



  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="mb-5 mx-auto">
            <div className="grid grid-cols-6 mb-4">
              <div className="col-span-3">
                <button className="px-4 py-2 font-bold text-3xl border rounded bg-white text-gray-700">
                  Employees
                </button>
              </div>
              <div className="col-span-3 mx-auto my-auto gap-2 flex items-center justify-between">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by employee name"
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add New Employee
                </button>
                <label className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer">
                  Import Data
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => exportToExcel(allEmployee, "EmployeeData")}
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Export Data
                </button>
              </div>
            </div>
          </div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 ">
              <tr className="text-justify">
                <th className="px-4 py-2 border-b border-gray-200">Employee</th>
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
