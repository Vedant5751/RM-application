import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ClientForm from "../components/ClientForm";
import ClientTable from "../components/ClientTable";
import { exportToExcel } from "../utils/exportData";
import axios from "axios";
import endpoint from "../../endpoints";

export default function Client() {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetch("https://chic-enthusiasm-production.up.railway.app/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);
  
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5 relative">
          <div className="grid grid-cols-6 mb-4">
            <div className="col-span-4">
              <button className="px-4 py-2 font-bold text-3xl border rounded bg-white text-gray-700">
                Clients
              </button>
            </div>
            <div className="col-span-2 mx-auto my-auto gap-2 flex items-center justify-between">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by client name"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add New Client
              </button>
              <button
                type="button"
                onClick={() => exportToExcel(clients, "ClientData")}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Export Data
              </button>
            </div>
          </div>
          <div>
            <ClientTable searchQuery={searchQuery} />
          </div>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
                <ClientForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
