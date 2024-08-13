import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Layout, Users, UserCircle, FileText, Users as UsersIcon, LogOut, Filter, X, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sidebarIcons = [
    { Icon: User, label: 'Profile', path: '/' },
    { Icon: Layout, label: 'Dashboard', path: '/' },
    { Icon: Users, label: 'Team', path: '/' },
    { Icon: UserCircle, label: 'Clients', path: '/clients' },
    { Icon: FileText, label: 'Projects', path: '/projects' },
    { Icon: UsersIcon, label: 'Employees', path: '/employee' },
];

const SkillBar = ({ skill, level }) => (
    <div className="flex items-center mb-2">
        <span className="w-24 text-sm">{skill}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${level}%` }}
            ></div>
        </div>
    </div>
);

const EmployeeList = ({ employees, onSelectEmployee }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Employees</h2>
        <div className="space-y-2">
            {employees.map((employee) => (
                <motion.div
                    key={employee.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onSelectEmployee(employee)}
                >
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.designation}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">${employee.ctc}</p>
                        <p className="text-sm text-gray-600">{employee.status}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);


const ProfileTab = ({ employee }) => (
    <div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
                <p className="font-semibold">Employee ID</p>
                <p>{employee.id}</p>
            </div>
            <div>
                <p className="font-semibold">Email</p>
                <p>{employee.email}</p>
            </div>
            <div>
                <p className="font-semibold">Work Location</p>
                <p>{employee.workLocation}</p>
            </div>
            <div>
                <p className="font-semibold">Extension</p>
                <p>{employee.extension}</p>
            </div>
            <div>
                <p className="font-semibold">Mobile</p>
                <p>{employee.mobile}</p>
            </div>
        </div>
        <div>
            <h4 className="text-lg font-semibold mb-2">Skill Set</h4>
            {employee.skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill.name} level={skill.level} />
            ))}
        </div>
    </div>
);

const FeedsTab = ({ feeds }) => (
    <div className="space-y-4">
        {feeds.map((feed, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">{feed.title}</p>
                <p className="text-sm text-gray-600">{feed.date}</p>
                <p className="mt-2">{feed.content}</p>
            </div>
        ))}
    </div>
);

const GoalsTab = ({ goals }) => (
    <div className="space-y-4">
        {goals.map((goal, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">{goal.title}</p>
                <p className="text-sm text-gray-600">Due: {goal.dueDate}</p>
                <div className="mt-2 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
                </div>
            </div>
        ))}
    </div>
);

const LeavesTab = ({ leaves }) => (
    <div className="space-y-4">
        {leaves.map((leave, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                    <p className="font-semibold">{leave.type}</p>
                    <p className="text-sm text-gray-600">{leave.startDate} - {leave.endDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    leave.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        leave.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                }`}>
                    {leave.status}
                </span>
            </div>
        ))}
    </div>
);

const ApprovalTab = ({ approvals }) => (
    <div className="space-y-4">
        {approvals.map((approval, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold">{approval.type}</p>
                <p className="text-sm text-gray-600">Requested on: {approval.requestDate}</p>
                <p className="mt-2">{approval.description}</p>
                <div className="mt-4 flex space-x-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                        Approve
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                        Reject
                    </button>
                </div>
            </div>
        ))}
    </div>
);

const EmployeeProfile = ({ employee, onClose }) => {
    const [activeTab, setActiveTab] = useState('Profile');

    const tabContent = {
        Profile: <ProfileTab employee={employee} />,
        Feeds: <FeedsTab feeds={employee.feeds} />,
        Goals: <GoalsTab goals={employee.goals} />,
        Leave: <LeavesTab leaves={employee.leaves} />,
        Approval: <ApprovalTab approvals={employee.approvals} />
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-lg p-6"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 mr-4"
                    >
                        <ChevronLeft size={24} />
                    </motion.button>
                    <h2 className="text-2xl font-semibold">{employee.name}</h2>
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">Added on {employee.addedOn}</span>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>
            </div>
            <div className="flex mb-6">
                <div className="w-32 h-32 bg-gray-300 rounded-lg mr-6"></div>
                <div>
                    <h3 className="text-xl font-semibold">{employee.name}</h3>
                    <p className="text-gray-600">{employee.designation}</p>
                </div>
            </div>
            <div className="flex space-x-2 mb-6">
                {['Profile', 'Feeds', 'Goals', 'Leave', 'Approval'].map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-2 rounded-md transition-colors ${
                            activeTab === tab
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {tabContent[activeTab]}
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleIconClick = (path) => {
        navigate(path);
    };

    const mockEmployees = [
        {
            id: 'AV11024',
            name: 'John Doe',
            designation: 'Software Engineer',
            ctc: '90000',
            status: 'Active',
            email: 'john.doe@example.com',
            workLocation: 'New York',
            extension: '1234',
            mobile: '1234567890',
            addedOn: '27/04/24',
            skills: [
                { name: 'C++', level: 80 },
                { name: 'MySQL', level: 75 },
                { name: 'Java', level: 70 },
                { name: 'Web Development', level: 65 },
                { name: 'App Development', level: 60 },
                { name: 'Communication', level: 85 }
            ],
            feeds: [
                { title: 'Completed Project X', date: '2024-04-25', content: 'Successfully delivered Project X ahead of schedule.' },
                { title: 'New Team Member', date: '2024-04-20', content: 'Welcoming Jane to our development team!' }
            ],
            goals: [
                { title: 'Learn React Native', dueDate: '2024-06-30', progress: 60 },
                { title: 'Improve Code Quality', dueDate: '2024-05-31', progress: 80 }
            ],
            leaves: [
                { type: 'Vacation', startDate: '2024-07-01', endDate: '2024-07-05', status: 'Approved' },
                { type: 'Sick Leave', startDate: '2024-04-15', endDate: '2024-04-15', status: 'Approved' }
            ],
            approvals: [
                { type: 'Training Request', requestDate: '2024-04-22', description: 'Advanced React Workshop' },
                { type: 'Equipment Purchase', requestDate: '2024-04-18', description: 'New Laptop' }
            ]
        },
        {
            id: 'AV11025',
            name: 'Jane Smith',
            designation: 'Product Manager',
            ctc: '110000',
            status: 'Active',
            email: 'jane.smith@example.com',
            workLocation: 'San Francisco',
            extension: '5678',
            mobile: '9876543210',
            addedOn: '12/05/24',
            skills: [
                { name: 'Project Management', level: 90 },
                { name: 'Agile Methodologies', level: 85 },
                { name: 'Communication', level: 95 },
                { name: 'Leadership', level: 80 },
                { name: 'Product Strategy', level: 85 }
            ],
            feeds: [
                { title: 'Launched Product Y', date: '2024-06-01', content: 'Successfully launched Product Y with positive feedback.' },
                { title: 'Organized Hackathon', date: '2024-05-15', content: 'Led a company-wide hackathon to foster innovation.' }
            ],
            goals: [
                { title: 'Improve Team Collaboration', dueDate: '2024-08-31', progress: 70 },
                { title: 'Increase Product Adoption', dueDate: '2024-07-31', progress: 85 }
            ],
            leaves: [
                { type: 'Vacation', startDate: '2024-08-10', endDate: '2024-08-15', status: 'Pending' },
                { type: 'Sick Leave', startDate: '2024-05-20', endDate: '2024-05-21', status: 'Approved' }
            ],
            approvals: [
                { type: 'Conference Attendance', requestDate: '2024-06-05', description: 'Attend Tech Conference 2024' },
                { type: 'New Team Hire', requestDate: '2024-05-25', description: 'Hire new UX Designer' }
            ]
        },
        {
            id: 'AV11026',
            name: 'Michael Brown',
            designation: 'Data Analyst',
            ctc: '80000',
            status: 'Active',
            email: 'michael.brown@example.com',
            workLocation: 'Chicago',
            extension: '4321',
            mobile: '1231231234',
            addedOn: '15/06/24',
            skills: [
                { name: 'Data Analysis', level: 85 },
                { name: 'Python', level: 80 },
                { name: 'SQL', level: 75 },
                { name: 'Data Visualization', level: 70 },
                { name: 'Machine Learning', level: 65 }
            ],
            feeds: [
                { title: 'Analyzed Customer Data', date: '2024-07-10', content: 'Completed analysis of customer data for Q2.' },
                { title: 'New Predictive Model', date: '2024-06-25', content: 'Developed a new predictive model for sales forecasting.' }
            ],
            goals: [
                { title: 'Learn TensorFlow', dueDate: '2024-09-30', progress: 40 },
                { title: 'Improve Data Accuracy', dueDate: '2024-07-31', progress: 75 }
            ],
            leaves: [
                { type: 'Sick Leave', startDate: '2024-06-01', endDate: '2024-06-02', status: 'Approved' },
                { type: 'Vacation', startDate: '2024-07-15', endDate: '2024-07-20', status: 'Approved' }
            ],
            approvals: [
                { type: 'Data Tool Purchase', requestDate: '2024-06-20', description: 'Purchase new data visualization software' },
                { type: 'Training Request', requestDate: '2024-06-05', description: 'Advanced Data Science Course' }
            ]
        },
        {
            id: 'AV11027',
            name: 'Emily Davis',
            designation: 'UX Designer',
            ctc: '95000',
            status: 'Active',
            email: 'emily.davis@example.com',
            workLocation: 'Austin',
            extension: '8765',
            mobile: '3213213214',
            addedOn: '22/07/24',
            skills: [
                { name: 'UX Design', level: 90 },
                { name: 'Prototyping', level: 85 },
                { name: 'User Research', level: 80 },
                { name: 'Figma', level: 75 },
                { name: 'Adobe XD', level: 70 }
            ],
            feeds: [
                { title: 'Redesigned Company Website', date: '2024-07-30', content: 'Led the redesign of the company website with a focus on UX.' },
                { title: 'Conducted User Interviews', date: '2024-07-15', content: 'Completed user interviews for the upcoming product launch.' }
            ],
            goals: [
                { title: 'Enhance Mobile Experience', dueDate: '2024-09-30', progress: 50 },
                { title: 'Increase User Engagement', dueDate: '2024-08-31', progress: 70 }
            ],
            leaves: [
                { type: 'Vacation', startDate: '2024-09-01', endDate: '2024-09-05', status: 'Pending' },
                { type: 'Sick Leave', startDate: '2024-08-01', endDate: '2024-08-01', status: 'Approved' }
            ],
            approvals: [
                { type: 'Design Tool Upgrade', requestDate: '2024-07-25', description: 'Upgrade to the latest version of Adobe XD' },
                { type: 'Conference Attendance', requestDate: '2024-07-10', description: 'Attend UX Design Summit 2024' }
            ]
        }
    ];


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
                            onClick={() => handleIconClick(path)}
                        >
                            <Icon size={32} className="ml-4" />
                            <motion.span
                                className="ml-4 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {label}
                            </motion.span>
                        </motion.div>
                    ))}
                    <motion.div
                        className="mt-auto cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        <LogOut size={32} className="ml-4" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-gray-800">Employee Management</h1>
                    <motion.button
                        className="bg-blue-500 text-white px-5 py-2 rounded-full flex items-center shadow-lg"
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
                            className="bg-gray-200 p-4 rounded-lg shadow-inner overflow-hidden mb-4 mx-4"
                        >
                            {/* ... (Filter content remains the same) */}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Employee Management Interface */}
                <main className="p-6 overflow-auto" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EmployeeList
                            employees={mockEmployees}
                            onSelectEmployee={setSelectedEmployee}
                        />
                        <AnimatePresence>
                            {selectedEmployee && (
                                <EmployeeProfile
                                    employee={selectedEmployee}
                                    onClose={() => setSelectedEmployee(null)}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mr-2 p-2 bg-gray-200 rounded-full"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <span className="mx-4 text-lg font-semibold">Page {currentPage}</span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="ml-2 p-2 bg-gray-200 rounded-full"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;