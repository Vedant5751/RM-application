import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaFileInvoiceDollar,
  FaProjectDiagram,
  FaUsers,
  FaBars,
  FaTimes,
  FaComment,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "./Tooltip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  const iconClasses = "flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700";

  return (
    <div
      className={`flex ${isOpen ? "w-60" : "w-20 items-center"
        } flex-col h-screen p-3 bg-gray-800 shadow transition-width duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="text-white focus:outline-none mb-6"
      >
        <Tooltip title={isOpen ? "Close Menu" : "Open Menu"} isSidebarOpen={isOpen}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Tooltip>
      </button>
      <div className="flex-1 space-y-6 text-lg">
        <ul className="space-y-6 text-gray-100">
          <li className="rounded-sm">
            <Link to="/home">
              <Tooltip title="Dashboard" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/home") ? "bg-gray-700" : ""}`}
                >
                  <FaTachometerAlt size={24} />
                  {isOpen && <span>Dashboard</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
          <li className="rounded-sm">
            <Link to="/client">
              <Tooltip title="Client" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/client") ? "bg-gray-700" : ""}`}
                >
                  <FaBriefcase size={24} />
                  {isOpen && <span>Client</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
          <li className="rounded-sm">
            <Link to="/account">
              <Tooltip title="Accounts" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/account") ? "bg-gray-700" : ""}`}
                >
                  <FaFileInvoiceDollar size={24} />
                  {isOpen && <span>Accounts</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
          <li className="rounded-sm">
            <Link to="/project">
              <Tooltip title="Project" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/project") ? "bg-gray-700" : ""}`}
                >
                  <FaProjectDiagram size={24} />
                  {isOpen && <span>Project</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
          <li className="rounded-sm">
            <Link to="/employee">
              <Tooltip title="Employee" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/employee") ? "bg-gray-700" : ""}`}
                >
                  <FaUsers size={24} />
                  {isOpen && <span>Employee</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto text-lg">
        <ul className="space-y-6 text-gray-100">
          <li className="rounded-sm">
            <Link to="/feedback">
              <Tooltip title="Feedback" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/feedback") ? "bg-gray-700" : ""}`}
                >
                  <FaComment size={24} />
                  {isOpen && <span>Feedback</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
          <li className="rounded-sm">
            <Link to="/">
              <Tooltip title="Logout" isSidebarOpen={isOpen}>
                <p
                  className={`${iconClasses} ${isActive("/") ? "bg-gray-700" : ""}`}
                >
                  <FaSignOutAlt size={24} />
                  {isOpen && <span>Logout</span>}
                </p>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
