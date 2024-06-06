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
