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
        <div className="flex items-center mb-6">
          <div className="w-1/3 flex justify-center items-center">
            <img
              src={employee.profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="ml-6 grow">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              {employee.employee_name}
            </h3>
            <div className="flex gap-40">
              <div className="flex flex-col gap-6">
                <p className="text-gray-600">
                  <strong>Employee ID:</strong> {employee.employee_id}
                </p>
                <p className="text-gray-600">
                  <strong>Designation:</strong> {employee.designation}
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-gray-600">
                  <strong>DOB:</strong> {employee.dob}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {employee.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="text-gray-700">
                  <strong>Business Unit:</strong> {employee.bu}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Date of Joining:</strong> {employee.doj}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Year of Joining:</strong> {employee.year_of_joining}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Offshore/Onsite:</strong> {employee.offshore_onsite}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Project:</strong> {employee.project}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Sub-Project:</strong> {employee.sub_project}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Project Remarks:</strong>{" "}
                  {employee.project_remarks_from_bu}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Project Start Date:</strong>{" "}
                  {employee.project_start_date}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Project End Date:</strong> {employee.project_end_date}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Billed:</strong> {employee.billed}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Unbilled Days:</strong> {employee.unbilled_days}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Allocation Start Date:</strong>{" "}
                  {employee.allocation_start_date}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Allocation End Date:</strong>{" "}
                  {employee.allocation_end_date}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Bilingual:</strong> {employee.bilingual}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Language Level:</strong> {employee.language_level}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Primary Skill:</strong> {employee.primary_skill}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Secondary Skill:</strong> {employee.secondary_skill}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>SRM Experience (Years):</strong>{" "}
                  {employee.srm_experience_in_years}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Previous Experience:</strong>{" "}
                  {employee.previous_experience}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Overall Experience:</strong>{" "}
                  {employee.overall_experience}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Certification:</strong> {employee.certification}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Certification 2:</strong> {employee.certification_2}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Appraisal Rating (2023):</strong>{" "}
                  {employee.appraisal_rating_2023}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Bill Rate:</strong> {employee.bill_rate}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>CTC per annum:</strong> {employee.ctc}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>CTC per month:</strong> {employee.ctc/12}
                </div>
              </div>
              <div>
                <div className="text-gray-700">
                  <strong>Separation Date:</strong> {employee.separation_date}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-700">
                  <strong>Remarks:</strong> {employee.remarks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
