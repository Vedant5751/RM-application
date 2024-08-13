import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const SignInPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (userId === 'test@srmtech.com' && password === '123') {

            setTimeout(() => {
                setIsLoading(false);
                console.log('Navigating to Dashboard');
                navigate('/');
            }, 2000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                setError('Invalid username or password');
            }, 2000);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full"
            >
                <div className="md:w-1/2 p-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                        className="text-white text-4xl font-bold"
                    >
                        RESOURCIFY
                    </motion.h1>
                </div>
                <div className="md:w-1/2 p-8">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-semibold mb-6"
                    >
                        Sign In
                    </motion.h2>
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-4"
                        >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                                UserId
                            </label>
                            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                                <input
                                    className="appearance-none border rounded-lg w-full py-3 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    id="userId"
                                    type="text"
                                    placeholder="UserId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6"
                        >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                                <input
                                    className="appearance-none border rounded-lg w-full py-3 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800 transition duration-300"
                                href="#"
                            >
                                Forgot Password?
                            </motion.a>
                        </motion.div>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-4 text-red-500 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-between"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        ↻
                                    </motion.span>
                                ) : (
                                    'Continue'
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center text-gray-500 text-xs mt-4"
                    >
                        Unable to Connect? Get in touch with our Support Team
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignInPage;