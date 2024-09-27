import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as XLSX from "xlsx";
import endpoint from "../../endpoints";

export default function ProjectForm({ project, onClose }) {
  const [projectID, setProjectID] = useState("");
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
  const [uploadedEmployeeIds, setUploadedEmployeeIds] = useState([]);

  const [projects, setProjects] = useState([]);
  const [clientName, setClientName] = useState("");
  const [accountName, setAccountName] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (project) {
      setProjectID(project.project_id || "");
      setProjectName(project.project_name || "");
      setProjectStatus(project.project_status || "");
      setProjectManagerId(project.project_manager_id || "");
      setProjectManagerName(project.project_manager_name || "");
      setProjectDescription(project.project_description || "");
      setProjectOwningBU(project.project_owning_bu || "");
      setProjectOwningSBU(project.project_owning_sbu || "");
      setProjectType(project.project_type || "");
      setCountry(project.country || "");
      setState(project.state || "");
      setCity(project.city || "");
      setProjectStartDate(formatDate(project.project_start_date) || "");
      setProjectEndDate(formatDate(project.project_end_date) || "");
      setClientId(project.client_id || "");
      setAccountId(project.account_id || "");
      setSelectedEmployees(project.add_employees || []);
    }
  }, [project]);

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
        if (data.length > 0 && !project) {
          const latestProjectID = getLatestProjectID(data);
          generateProjectID(latestProjectID);
        } else if (project) {
          setProjectID(project.project_id);
        } else {
          generateProjectID(0);
        }
      } else {
        console.error("Failed to fetch client data");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const getLatestProjectID = (projects) => {
    const ids = projects.map((project) =>
      parseInt(project.project_id.replace("PR", ""), 10)
    );
    return Math.max(...ids);
  };

  const generateProjectID = (latestID) => {
    const newID = latestID + 1;
    const paddedID = String(newID).padStart(4, "0");
    setProjectID(`PR${paddedID}`);
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
      project_id: projectID,
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
      add_employees: handleFileUpload ? uploadedEmployeeIds : selectedEmployees,
    };

    console.log(projectData);

    try {
      const response = project
        ? await fetch(
            "https://chic-enthusiasm-production.up.railway.app/project/${projectID}",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(projectData),
            }
          )
        : await fetch(
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
        const errorMessage = await response.text();
        alert(`Failed to add project: ${error.message}`);
      }
    } catch (err) {
      console.error("Error adding project:", err);
      alert("An error occurred while adding the project");
    }
  };

  // Function to handle file upload and parse Excel data
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Extract Employee IDs from parsedData
      const employeeIds = parsedData.map((row) => row["Employee ID"]);

      // Update uploaded employee IDs state
      setUploadedEmployeeIds(employeeIds);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prevSelected) => [...prevSelected, employeeId]);
  };

  const removeSelectedEmployee = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.filter((id) => id !== employeeId)
    );
  };

  const filteredAccounts = accounts.filter(
    (account) => account.client_id === clientId
  );

  const handleClientChange = (e) => {
    const selectedClientId = e.target.value;
    setClientId(selectedClientId);

    // Find the selected client in the clients array
    const selectedClient = clients.find(
      (client) => client.client_id === selectedClientId
    );

    // Set the Account BU, Country, and Currency based on the selected client
    if (selectedClient) {
      setProjectOwningBU(selectedClient.bu || "");
      setCountry(selectedClient.location || ""); 
      // Additional logic can be added here if needed
    } else {
      setProjectOwningBU("");
      setCountry("");
    }
  };

  const handleOwningBUChange = (e) => {
    const selectedBU = e.target.value;
    setProjectOwningBU(selectedBU);

    // If BU is not Digital Practice, clear and disable the SBU field
    if (selectedBU !== "Digital Practice") {
      setProjectOwningSBU(""); // Clear SBU
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
          value={projectID}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Client
        </label>
        <select
          value={clientId}
          onChange={handleClientChange}
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
          Account Name
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
          Country:
        </label>
        <input
          type="text"
          value={country}
          readOnly
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
        <input
          value={projectOwningBU}
          onChange={handleOwningBUChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          readOnly
          required
        />
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
          disabled={projectOwningBU !== "Digital Practice"} 
        >
          <option value="">Select</option>
          <option value="SBU_6_DBT_Inv">SBU_6_DBT_Inv</option>
          <option value="SBU_5_India_Inv">SBU_5_India_Inv</option>
          <option value="SBU_4_SCM_Inv">SBU_4_SCM_Inv</option>
          <option value="SBU_3_SRM_Groups_Inv">SBU_3_SRM_Groups_Inv</option>
          <option value="SBU_2_Japan_Inv">SBU_2_Japan_Inv</option>
          <option value="SBU_1_ US_Inv">SBU_1_ US_Inv</option>
          <option value="SBU_6_DBT">SBU_6_DBT</option>
          <option value="SBU_5_India">SBU_5_India</option>
          <option value="SBU_4_SCM">SBU_4_SCM</option>
          <option value="SBU_3_SRM_Groups">SBU_3_SRM_Groups</option>
          <option value="SBU_2_Japan">SBU_2_Japan</option>
          <option value="SBU_1_ US">SBU_1_ US</option>
          <option value="SBU_7_CIS">SBU_7_CIS</option>
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
          <option value="Other">Other</option>
        </select>
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
          Upload Employee Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Display parsed employee IDs for review */}
      {uploadedEmployeeIds.length > 0 && (
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Uploaded Employee IDs:
          </p>
          <ul>
            {uploadedEmployeeIds.map((empId, index) => (
              <li key={index}>{empId}</li>
            ))}
          </ul>
        </div>
      )}
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
