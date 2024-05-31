import React from 'react';

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className='relative w-full h-full'>
          <img src='src/assets/Group 8.png' className='absolute inset-0 w-full h-full object-cover py-2 px-14' alt="Background" />
          <img src="src/assets/LoginLogo.png" className='absolute inset-0 w-full h-full object-contain py-2 z-10' alt="Login Logo" />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-5xl font-semibold mb-6 text-black text-center">
            Log In
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-lg focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
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
              />
            </div>
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
