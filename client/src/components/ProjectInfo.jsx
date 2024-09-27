import { useState } from "react";
import ProjectForm from "./ProjectForm";

export default function ProjectInfo({ project, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`${
            isEditing ? "h-3/4" : "h-auto"
          } bg-white w-3/4  p-6 rounded-lg shadow-lg overflow-auto relative`}
        >
          <button
            onClick={onClose}
            className="absolute right-8 text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
          {isEditing ? (
            <ProjectForm project={project} onClose={handleFormClose} />
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="absolute right-24 text-gray-700 hover:text-gray-900"
              >
                Edit
              </button>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Project Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project ID:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Name:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.client_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Account Name:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.account_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.country}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.state}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.city}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project Name:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project Status:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_status}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project Manager ID:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_manager_id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project Manager Name:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_manager_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Owning BU:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_owning_bu}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Owning SBU:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_owning_sbu}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Project Type:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_type}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_start_date}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_end_date}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Project Description:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.project_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
