import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = {
  "balav@srmtech.com": {
    password: "admin",
    role: "Admin",
  },
  "hemapriya@srmtech.com": {
    password: "buhead",
    role: "Business Unit Head",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[email];

    if (user && user.password === password) {
      setError("");
      alert(`Login successful! Role: ${user.role}`);
      navigate("/home");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className="relative w-full h-full">
          <img
            src="src/assets/Logo.jpg"
            className="absolute inset-0 w-full h-full object-contain pr-20 pl-20 z-10 shadow-xl"
            alt="Login Logo"
          />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-5xl font-semibold mb-6 text-black text-center">
            Log In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="something@srmtech.com"
                className="mt-1 p-2 w-full border rounded-lg focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-lg focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="text-right hover:underline">
              <a href="#" className="text-indigo-700">
                Forgot Password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white mt-4 p-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <a href="#" className="text-sm hover:underline">
                Unable to Connect? Get in touch with our
                <span className="font-bold"> Support Team</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
