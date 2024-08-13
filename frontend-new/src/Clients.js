import React, { useState } from 'react';
import { Users, Plus, ChevronLeft, User, Layout, UserCircle, FileText, Users as UsersIcon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sidebarIcons = [
    { Icon: User, label: 'Profile', path: '/' },
    { Icon: Layout, label: 'Dashboard', path: '/' },
    { Icon: Users, label: 'Team', path: '/' },
    { Icon: UserCircle, label: 'Clients', path: '/clients' },
    { Icon: FileText, label: 'Projects', path: '/projects' },
    { Icon: UsersIcon, label: 'Employees', path: '/employees' },
];

const ClientDashboard = () => {
    const [clients, setClients] = useState([
        { id: 1, name: 'Client_Name1' },
        { id: 2, name: 'Client_Name2' },
        { id: 3, name: 'Client_Name3' },
        { id: 4, name: 'Client_Name4' },
        { id: 5, name: 'Client_Name5' },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);

    const addClient = (newClient) => {
        setClients([...clients, { id: clients.length + 1, ...newClient }]);
        setShowAddForm(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <motion.div
                className="bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-lg"
                initial={{width: 80}} // Initial width when not hovered
                whileHover={{width: 250}} // Width on hover
                transition={{duration: 0.3}}
                style={{overflow: 'hidden'}}
            >
                <div className="flex flex-col py-8 h-full">
                    {sidebarIcons.map(({Icon, label, path}, index) => (
                        <Link to={path} key={label} className="w-full">
                            <motion.div
                                className="mb-8 cursor-pointer group flex items-center"
                                whileHover={{scale: 1.1}}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1, duration: 0.3}}
                            >
                                <Icon size={32} className="ml-4"/>
                                <motion.span
                                    className="ml-4 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.3}}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {label}
                                </motion.span>
                            </motion.div>
                        </Link>
                    ))}
                    <motion.div
                        className="mt-auto cursor-pointer flex items-center"
                        whileHover={{scale: 1.1}}
                        initial={{opacity: 0, y: 10}} // Initial state
                        animate={{opacity: 1, y: 0}} // Animated state
                        transition={{delay: sidebarIcons.length * 0.1, duration: 0.3}} // Delay for logout icon
                    >
                        <LogOut size={32} className="ml-4"/>
                        <motion.span
                            className="ml-4 opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden"
                            initial={{opacity: 0}} // Hidden initially
                            animate={{opacity: 1}} // Visible on hover
                            transition={{duration: 0.3}}
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            Logout
                        </motion.span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 p-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {!showAddForm ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
                                <motion.button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
                                    whileTap={{scale: 0.95}}
                                >
                                    <Plus size={20} className="mr-2"/>
                                    Add Client
                                </motion.button>
                            </div>
                            <motion.div
                                className="bg-white rounded-lg shadow-xl overflow-hidden"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact
                                            Person
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact
                                            Info
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {clients.map((client) => (
                                        <motion.tr
                                            key={client.id}
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{duration: 0.3}}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">-</td>
                                            <td className="px-6 py-4 whitespace-nowrap">-</td>
                                            <td className="px-6 py-4 whitespace-nowrap">-</td>
                                        </motion.tr>
                                    ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        </>
                    ) : (
                        <AddClientForm onSubmit={addClient} onCancel={() => setShowAddForm(false)}/>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
const AddClientForm = ({onSubmit, onCancel}) => {
    const [formData, setFormData] = useState({
        name: '',
        currency: '',
        billingMethod: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-white rounded-lg shadow-xl p-6"
        >
            <div className="flex items-center mb-6">
                <motion.button
                    onClick={onCancel}
                    className="mr-4"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    <ChevronLeft size={24} className="text-gray-800"/>
                </motion.button>
                <h2 className="text-2xl font-bold text-gray-800">Add Client</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="">Select</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="gbp">GBP</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Billing Method</label>
                    <select
                        name="billingMethod"
                        value={formData.billingMethod}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="">Select</option>
                        <option value="invoice">Invoice</option>
                        <option value="credit-card">Credit Card</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <motion.button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-md text-sm font-medium shadow-sm hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Save
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default ClientDashboard;