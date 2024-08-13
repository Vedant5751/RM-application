import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Layout, Users, UserCircle, FileText, Users as UsersIcon, LogOut, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const sidebarIcons = [
    { Icon: User, label: 'Profile', path: '/' },
    { Icon: Layout, label: 'Dashboard', path: '/' },
    { Icon: Users, label: 'Team', path: '/' },
    { Icon: UserCircle, label: 'Clients', path: '/clients' },
    { Icon: FileText, label: 'Projects', path: '/projects' },
    { Icon: UsersIcon, label: 'Employees', path: '/employee' },
];

const Dashboard = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleIconClick = (path) => {
        navigate(path); // Navigate to the specified path
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
                            className="mb-8 cursor-pointer relative group w-full flex items-center justify-start"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            onClick={() => handleIconClick(path)} // Add onClick handler
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
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                    <motion.button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full flex items-center shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? <X size={18} className="mr-2" /> : <Filter size={18} className="mr-2" />}
                        {showFilters ? 'Close Filters' : 'Show Filters'}
                    </motion.button>
                </header>

                {/* Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-gray-200 p-4 rounded-lg shadow-inner overflow-hidden mb-4"
                        >
                            <div className="flex space-x-4">
                                <select className="p-3 rounded-lg bg-white shadow">
                                    <option>Department: All</option>
                                    <option>Department: Software</option>
                                    <option>Department: Hardware</option>
                                </select>
                                <select className="p-3 rounded-lg bg-white shadow">
                                    <option>BU: All</option>
                                    <option>BU: Software</option>
                                    <option>BU: Hardware</option>
                                </select>
                                <button className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-lg shadow">Apply Filters</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dashboard content */}
                <main className="p-6 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Head Count */}
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Head Count</h2>
                            <p className="text-5xl font-bold text-blue-600">832</p>
                        </motion.div>
                        {/* Billed Resource */}
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Billed Resource</h2>
                            <div className="flex justify-center items-center h-32">
                                <div className="w-48 h-24 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative shadow-lg">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
                                        555
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Unbilled Resource */}
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Unbilled Resource</h2>
                            <div className="flex justify-center items-center h-32">
                                <div className="w-48 h-24 bg-gradient-to-r from-yellow-500 to-gray-300 rounded-full relative shadow-lg">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
                                        277
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bar Chart (Power BI placeholder) */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onHoverStart={() => setShowTable(true)}
                        onHoverEnd={() => setShowTable(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bar Chart</h2>
                        <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-inner">
                            <p>Power BI Bar Chart would be embedded here</p>
                        </div>
                        <AnimatePresence>
                            {showTable && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 bg-white p-4 rounded-lg shadow-2xl mt-2"
                                >
                                    <table className="w-full">
                                        <thead>
                                        <tr>
                                            <th className="text-left text-gray-800">Category</th>
                                            <th className="text-left text-gray-800">Value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="py-2">Category A</td>
                                            <td className="py-2">25</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Category B</td>
                                            <td className="py-2">15</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Category C</td>
                                            <td className="py-2">20</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
