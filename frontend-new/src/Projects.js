import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Layout, Users, UserCircle, FileText, Users as UsersIcon, LogOut, Filter, X, Plus, Edit2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const sidebarIcons = [
    { Icon: User, label: 'Profile', path: '/' },
    { Icon: Layout, label: 'Dashboard', path: '/' },
    { Icon: Users, label: 'Team', path: '/' },
    { Icon: UserCircle, label: 'Clients', path: '/clients' },
    { Icon: FileText, label: 'Projects', path: '/projects' },
    { Icon: UsersIcon, label: 'Employees', path: '/Employee' },
];
const ProjectDashboard = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: 'Project1', estimatedHours: 100, loggedHours: 50, status: 'active' },
        { id: 2, name: 'Project2', estimatedHours: 200, loggedHours: 75, status: 'active' },
        { id: 3, name: 'Project3', estimatedHours: 150, loggedHours: 25, status: 'active' },
    ]);
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddProject = (newProject) => {
        setProjects([...projects, { ...newProject, id: projects.length + 1, status: 'active' }]);
        setIsAddProjectOpen(false);
    };

    const handleEditProject = (editedProject) => {
        setProjects(projects.map(p => p.id === editedProject.id ? editedProject : p));
        setEditingProject(null);
    };

    const handleDeleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <motion.div
                className="bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-lg"
                initial={{ width: 80 }}
                whileHover={{ width: 250 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
                <div className="flex flex-col items-center py-8 h-full">
                    {sidebarIcons.map(({ Icon, label, path }, index) => (
                        <motion.div
                            key={label}
                            className={`mb-8 cursor-pointer relative group w-full flex items-center justify-start ${location.pathname === path ? 'bg-white bg-opacity-20' : ''}`}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            onClick={() => navigate(path)}
                        >
                            <Icon size={32} className="ml-4" />
                            <motion.span
                                className="ml-4 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {label}
                            </motion.span>
                        </motion.div>
                    ))}
                    <motion.div
                        className="mt-auto cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sidebarIcons.length * 0.1, duration: 0.3 }}
                    >
                        <LogOut size={32} className="ml-4" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-gray-800">Projects</h1>
                    <motion.button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full flex items-center shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddProjectOpen(true)}
                    >
                        <Plus size={18} className="mr-2" />
                        Add Project
                    </motion.button>
                </header>

                {/* Projects list */}
                <main className="p-6 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 mb-4 p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold">{project.name}</h3>
                                            <div className="text-sm text-gray-600">
                                                Estimated: {project.estimatedHours}h | Logged: {project.loggedHours}h
                                            </div>
                                            <div className="mt-2">
                                                <span className={`inline-block w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></span>
                                                {project.status}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="hover:bg-blue-100 rounded-full p-2"
                                                onClick={() => setEditingProject(project)}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                className="hover:bg-red-100 rounded-full p-2"
                                                onClick={() => handleDeleteProject(project.id)}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </main>
            </div>

            {/* Add/Edit Project Modal */}
            {(isAddProjectOpen || editingProject) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
                        <ProjectForm
                            project={editingProject}
                            onSubmit={editingProject ? handleEditProject : handleAddProject}
                            onCancel={() => {
                                setIsAddProjectOpen(false);
                                setEditingProject(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProjectForm = ({ project, onSubmit, onCancel }) => {
    const [projectDetails, setProjectDetails] = useState(project || {
        projectId: '',
        projectName: '',
        projectManagerId: '',
        projectManagerName: '',
        projectOwningSbu: '',
        projectOwningBu: '',
        projectType: '',
        startDate: '',
        endDate: '',
        currency: '',
        country: '',
        state: '',
        city: '',
        languageSupported: '',
        projectDescription: '',
    });

    const handleChange = (e) => {
        setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(projectDetails);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="projectId"
                    placeholder="Project ID"
                    value={projectDetails.projectId}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectName"
                    placeholder="Project Name"
                    value={projectDetails.projectName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectManagerId"
                    placeholder="Project Manager ID"
                    value={projectDetails.projectManagerId}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectManagerName"
                    placeholder="Project Manager Name"
                    value={projectDetails.projectManagerName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectOwningSbu"
                    placeholder="Project Owning SBU"
                    value={projectDetails.projectOwningSbu}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectOwningBu"
                    placeholder="Project Owning BU"
                    value={projectDetails.projectOwningBu}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="projectType"
                    placeholder="Project Type"
                    value={projectDetails.projectType}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={projectDetails.startDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={projectDetails.endDate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="currency"
                    placeholder="Currency"
                    value={projectDetails.currency}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="country"
                    placeholder="Country"
                    value={projectDetails.country}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="state"
                    placeholder="State"
                    value={projectDetails.state}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="city"
                    placeholder="City"
                    value={projectDetails.city}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="languageSupported"
                    placeholder="Language Supported"
                    value={projectDetails.languageSupported}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </div>
            <textarea
                name="projectDescription"
                placeholder="Project Description"
                value={projectDetails.projectDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
            />
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    {project ? 'Update' : 'Add'} Project
                </button>
            </div>
        </form>
    );
};

export default ProjectDashboard;