import React, { useState } from 'react';
import { FaTachometerAlt, FaBriefcase, FaFileInvoiceDollar, FaProjectDiagram, FaUsers, FaBars, FaTimes, FaComment, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex ${isOpen ? 'w-60' : 'w-20'} flex-col h-screen p-3 bg-gray-800 shadow transition-width duration-300`}>
            <button 
                onClick={toggleSidebar} 
                className="text-white focus:outline-none mb-6">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="flex-1 space-y-6 text-lg">
                <ul className="space-y-6 text-gray-100">
                    <li className="rounded-sm">
                        <a href="#dashboard" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaTachometerAlt size={24} />
                            {isOpen && <span>Dashboard</span>}
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a href="#client" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaBriefcase size={24} />
                            {isOpen && <span>Client</span>}
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a href="#accounts" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaFileInvoiceDollar size={24} />
                            {isOpen && <span>Accounts</span>}
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a href="#project" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaProjectDiagram size={24} />
                            {isOpen && <span>Project</span>}
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a href="#employee" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaUsers size={24} />
                            {isOpen && <span>Employee</span>}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-auto text-lg">
                <ul className="space-y-6 text-gray-100">
                    <li className="rounded-sm">
                        <a href="#feedback" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaComment size={24} />
                            {isOpen && <span>Feedback</span>}
                        </a>
                    </li>
                    <li className="rounded-sm">
                        <a href="#logout" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
                            <FaSignOutAlt size={24} />
                            {isOpen && <span>Logout</span>}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
