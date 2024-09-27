import React, { useState, useEffect } from "react";
import endpoint from "../../endpoints";

export default function EmployeeForm({ employee, onClose }) {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [bu, setBu] = useState("");
  const [doj, setDoj] = useState("");
  const [yearOfJoining, setYearOfJoining] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [offshoreOnsite, setOffshoreOnsite] = useState("");
  const [project, setProject] = useState("");
  const [subProject, setSubProject] = useState("");
  const [projectRemarks, setProjectRemarks] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [billed, setBilled] = useState("billed");
  const [unbilledDays, setUnbilledDays] = useState(0);
  const [allocationStartDate, setAllocationStartDate] = useState("");
  const [allocationEndDate, setAllocationEndDate] = useState("");
  const [bilingual, setBilingual] = useState("no");
  const [languageLevel, setLanguageLevel] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [secondarySkill, setSecondarySkill] = useState("");
  const [srmExperience, setSrmExperience] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [overallExperience, setOverallExperience] = useState("");
  const [certification, setCertification] = useState("");
  const [certification2, setCertification2] = useState("");
  const [appraisalRating2023, setAppraisalRating2023] = useState("");
  const [billRate, setBillRate] = useState("");
  const [ctc, setCtc] = useState("");
  const [separationDate, setSeparationDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBilingualChange = (e) => {
    setBilingual(e.target.value);
  };

  const handleOffshoreOnsiteChange = (e) => {
    setOffshoreOnsite(e.target.value);
  };

  useEffect(() => {
    if (employee) {
      setEmployeeId(employee.employee_id || "");
      setEmployeeName(employee.employee_name || "");
      setDesignation(employee.designation || "");
      setBu(employee.bu || "");
      setDoj(formatDate(employee.doj) || "");
      setYearOfJoining(employee.year_of_joining || "");
      setDob(formatDate(employee.dob) || "");
      setLocation(employee.location || "");
      setOffshoreOnsite(employee.offshore_onsite || "");
      setProject(employee.project || "");
      setSubProject(employee.sub_project || "");
      setProjectRemarks(employee.project_remarks_from_bu || "");
      setProjectStartDate(formatDate(employee.project_start_date) || "");
      setProjectEndDate(formatDate(employee.project_end_date) || "");
      setBilled(employee.billed || "");
      setUnbilledDays(employee.unbilled_days || "");
      setAllocationStartDate(formatDate(employee.allocation_start_date) || "");
      setAllocationEndDate(formatDate(employee.allocation_end_date) || "");
      setBilingual(employee.bilingual || "");
      setLanguageLevel(employee.language_level || "");
      setPrimarySkill(employee.primary_skill || "");
      setSecondarySkill(employee.secondary_skill || "");
      setSrmExperience(employee.srm_experience_in_years || "");
      setPreviousExperience(employee.previous_experience || "");
      setOverallExperience(employee.overall_experience || "");
      setCertification(employee.certification || "");
      setCertification2(employee.certification_2 || "");
      setAppraisalRating2023(employee.appraisal_rating_2023 || "");
      setBillRate(employee.bill_rate || "");
      setCtc(employee.ctc || "");
      setSeparationDate(formatDate(employee.separation_date) || "");
      setRemarks(employee.remarks || "");
    }
  }, [employee]);

  // Update year of joining whenever the date of joining changes
  useEffect(() => {
    if (doj) {
      const year = new Date(doj).getFullYear();
      setYearOfJoining(year);
    } else {
      setYearOfJoining(""); // Reset if doj is cleared
    }
  }, [doj]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formatDateString = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const employeeData = {
      employee_id: employeeId,
      employee_name: employeeName,
      designation,
      bu,
      doj: formatDateString(doj),
      year_of_joining: parseInt(yearOfJoining),
      dob: formatDateString(dob),
      location,
      offshore_onsite: offshoreOnsite,
      project,
      sub_project: subProject,
      project_remarks_from_bu: projectRemarks,
      project_start_date: formatDateString(projectStartDate),
      project_end_date: formatDateString(projectEndDate),
      billed: billed.charAt(0),
      unbilled_days: parseInt(unbilledDays),
      allocation_start_date: formatDateString(allocationStartDate),
      allocation_end_date: formatDateString(allocationEndDate),
      bilingual: bilingual.charAt(0),
      language_level: languageLevel,
      primary_skill: primarySkill,
      secondary_skill: secondarySkill,
      srm_experience_in_years: parseInt(srmExperience),
      previous_experience: parseInt(previousExperience),
      overall_experience: parseInt(overallExperience),
      certification,
      certification_2: certification2,
      appraisal_rating_2023: parseInt(appraisalRating2023),
      bill_rate: parseFloat(billRate),
      ctc: parseFloat(ctc),
      separation_date: formatDateString(separationDate),
      remarks,
    };

    console.log(employeeData);

    try {
      const response = employee
        ? await fetch(
            `https://chic-enthusiasm-production.up.railway.app/employee/${employeeId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employeeData),
            }
          )
        : await fetch(
            "https://chic-enthusiasm-production.up.railway.app/employee",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(employeeData),
            }
          );

      if (response.ok) {
        alert("Employee saved successfully!");
        onClose();
      } else {
        const errorMessage = await response.text();
        alert("Failed to save employee: " + errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the employee.");
    }
  };

  const handleBilledChange = (e) => {
    setBilled(e.target.value);
    if (e.target.value === "billed") {
      setUnbilledDays(""); 
    }
  };

  useEffect(() => {
    const totalExperience =
      (parseFloat(srmExperience) || 0) + (parseFloat(previousExperience) || 0);

    setOverallExperience(totalExperience.toFixed(2)); 
  }, [srmExperience, previousExperience]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-md bg-white"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Employee ID:
        </label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Employee Name:
        </label>
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Designation:
        </label>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">DOB:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Date of Joining:
        </label>
        <input
          type="date"
          value={doj}
          onChange={(e) => setDoj(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Year of Joining:
        </label>
        <input
          type="text"
          value={yearOfJoining}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Offshore/Onsite:
        </label>
        <div className="mt-1">
          <label className="mr-4">
            <input
              type="radio"
              value="Offshore"
              checked={offshoreOnsite === "Offshore"}
              onChange={handleOffshoreOnsiteChange}
              className="mr-2"
            />
            Offshore
          </label>
          <label>
            <input
              type="radio"
              value="Onsite"
              checked={offshoreOnsite === "Onsite"}
              onChange={handleOffshoreOnsiteChange}
              className="mr-2"
            />
            Onsite
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Business Unit:
        </label>
        <select
          value={bu}
          onChange={(e) => setBu(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="ES">ES</option>
          <option value="Sales">Sales</option>
          <option value="Procurement">Procurement</option>
          <option value="Management">Management</option>
          <option value="GPE">GPE</option>
          <option value="STG - HO">STG - HO</option>
          <option value="Marketing">Marketing</option>
          <option value="ITKM - STG">ITKM - STG</option>
          <option value="GTSS">GTSS</option>
          <option value="Finance">Finance</option>
          <option value="Administration">Administration</option>
          <option value="E360">E360</option>
          <option value="Digital Practice">Digital Practice</option>
          <option value="Corporate - Quality">Corporate - Quality</option>
          <option value="HR">HR</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project:
        </label>
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sub Project:
        </label>
        <input
          type="text"
          value={subProject}
          onChange={(e) => setSubProject(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Project Remarks from BU:
        </label>
        <textarea
          value={projectRemarks}
          onChange={(e) => setProjectRemarks(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
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
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Billed/Unbilled:
        </label>
        <div className="mt-1">
          <label className="mr-4">
            <input
              type="radio"
              value="billed"
              checked={billed === "billed"}
              onChange={handleBilledChange}
              className="mr-2"
            />
            Billed
          </label>
          <label>
            <input
              type="radio"
              value="unbilled"
              checked={billed === "unbilled"}
              onChange={handleBilledChange}
              className="mr-2"
            />
            Unbilled
          </label>
        </div>
      </div>
      {billed === "unbilled" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Unbilled Days:
          </label>
          <input
            type="number"
            value={unbilledDays}
            onChange={(e) => setUnbilledDays(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter Unbilled Days"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Allocation Start Date:
        </label>
        <input
          type="date"
          value={allocationStartDate}
          onChange={(e) => setAllocationStartDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Allocation End Date:
        </label>
        <input
          type="date"
          value={allocationEndDate}
          onChange={(e) => setAllocationEndDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Bilingual:
        </label>
        <div className="mt-1">
          <label className="mr-4">
            <input
              type="radio"
              value="yes"
              checked={bilingual === "yes"}
              onChange={handleBilingualChange}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={bilingual === "no"}
              onChange={handleBilingualChange}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Language Level:
        </label>
        <input
          type="text"
          value={languageLevel}
          onChange={(e) => setLanguageLevel(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Primary Skill:
        </label>
        <input
          type="text"
          value={primarySkill}
          onChange={(e) => setPrimarySkill(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Secondary Skill:
        </label>
        <input
          type="text"
          value={secondarySkill}
          onChange={(e) => setSecondarySkill(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          SRM Experience in Years:
        </label>
        <input
          type="number"
          value={srmExperience}
          onChange={(e) => setSrmExperience(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Previous Experience:
        </label>
        <input
          type="number"
          value={previousExperience}
          onChange={(e) => setPreviousExperience(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Overall Experience:
        </label>
        <input
          type="number"
          value={overallExperience}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Certification:
        </label>
        <input
          type="text"
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Certification 2:
        </label>
        <input
          type="text"
          value={certification2}
          onChange={(e) => setCertification2(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Appraisal Rating 2023:
        </label>
        <input
          type="number"
          value={appraisalRating2023}
          onChange={(e) => setAppraisalRating2023(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Bill Rate:
        </label>
        <input
          type="number"
          value={billRate}
          onChange={(e) => setBillRate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CTC:</label>
        <input
          type="number"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Separation Date:
        </label>
        <input
          type="date"
          value={separationDate}
          onChange={(e) => setSeparationDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Remarks:
        </label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded bg-gray-300 text-gray-700 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border rounded bg-blue-700 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
