import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function ProjectForm({ onClose }) {
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectManagerId, setProjectManagerId] = useState("");
  const [projectManagerName, setProjectManagerName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectOwningBU, setProjectOwningBU] = useState("");
  const [projectOwningSBU, setProjectOwningSBU] = useState("");
  const [projectType, setProjectType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [clients, setClients] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjectData();
    // Fetch clients
    fetch("https://chic-enthusiasm-production.up.railway.app/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));

    // Fetch accounts
    fetch("https://chic-enthusiasm-production.up.railway.app/account")
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));

    // Fetch employees
    fetch("https://chic-enthusiasm-production.up.railway.app/employee")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/project"
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        generateProjectID(data.length); // Generate project ID based on the current number of accounts
      } else {
        console.error("Failed to fetch project data");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  
  const generateProjectID = (projectCount) => {
    const paddedID = String(projectCount + 1).padStart(4, "0"); // Increment the account count and pad it with zeros
    setProjectId(`PR${paddedID}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formatDateString = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const projectData = {
      project_id: projectId,
      project_name: projectName,
      project_status: projectStatus,
      project_manager_id: projectManagerId,
      project_manager_name: projectManagerName,
      project_description: projectDescription,
      project_owning_bu: projectOwningBU,
      project_owning_sbu: projectOwningSBU,
      project_type: projectType,
      country: country,
      state: state,
      city: city,
      project_start_date: formatDateString(projectStartDate),
      project_end_date: formatDateString(projectEndDate),
      client_id: clientId,
      account_id: accountId,
      add_employee: selectedEmployees.map((employee) => employee.value), // Extract employee IDs from selectedEmployees
    };
    console.log(projectData);
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        alert("Project added successfully!");
        onClose();
      } else {
        const contentType = response.headers.get("content-type");
        let error;
        if (contentType && contentType.includes("application/json")) {
          error = await response.json();
        } else {
          error = { message: await response.text() };
        }
        alert(`Failed to add project: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred while adding the project");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-md bg-white"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project ID:
        </label>
        <input
          type="text"
          value={projectId}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Name:
        </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Status:
        </label>
        <select
          value={projectStatus}
          onChange={(e) => setProjectStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Manager ID:
        </label>
        <input
          type="text"
          value={projectManagerId}
          onChange={(e) => setProjectManagerId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Manager Name:
        </label>
        <input
          type="text"
          value={projectManagerName}
          onChange={(e) => setProjectManagerName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Description:
        </label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Owning BU:
        </label>
        <select
          value={projectOwningBU}
          onChange={(e) => setProjectOwningBU(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="RM">RM</option>
          <option value="CS">CS</option>
          <option value="A1">A1</option>
          <option value="Etc">Etc</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Owning Sub-BU:
        </label>
        <select
          value={projectOwningSBU}
          onChange={(e) => setProjectOwningSBU(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="RM1">RM1</option>
          <option value="CS2">CS2</option>
          <option value="A11">A11</option>
          <option value="Etc">Etc</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Type:
        </label>
        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="RM">RM</option>
          <option value="CS">CS</option>
          <option value="A1">A1</option>
          <option value="Etc">Etc</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Country:
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          State:
        </label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Start Date:
        </label>
        <input
          type="date"
          value={projectStartDate}
          onChange={(e) => setProjectStartDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project End Date:
        </label>
        <input
          type="date"
          value={projectEndDate}
          onChange={(e) => setProjectEndDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Client Name:
        </label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.client_id} value={client.client_id}>
              {client.client_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Name:
        </label>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.account_id} value={account.account_id}>
              {account.account_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Employees:
        </label>
        <Select
          value={selectedEmployees}
          onChange={setSelectedEmployees}
          options={employees.map((employee) => ({
            value: employee.employee_id,
            label: employee.employee_name,
          }))}
          isMulti
          className="mt-1 block w-full rounded-md shadow-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
