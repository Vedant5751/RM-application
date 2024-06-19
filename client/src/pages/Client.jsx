import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ClientForm from "../components/ClientForm";

export default function Client() {
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("https://chic-enthusiasm-production.up.railway.app/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(
        `https://chic-enthusiasm-production.up.railway.app/client/${clientId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Client deleted successfully!");
        setClients(clients.filter((client) => client.client_id !== clientId)); // Update state to remove deleted client
      } else {
        const error = await response.json();
        alert(`Failed to delete client: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("An error occurred while deleting the client");
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5 relative">
          <div className="grid grid-cols-6 mb-4">
            <div className="col-span-5">
              <button className="px-4 py-2 border rounded bg-white text-gray-700">
                Clients
                <span className="inline-block transform rotate-90">
                  &#x25BE;
                </span>
              </button>
            </div>
            <div className="col-span-1 mx-auto">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Client +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {clients.map((client) => (
              <div key={client.client_id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{client.client_name}</h3>
                <p>ID: {client.client_id}</p>
                <p>Email: {client.email_id}</p>
                <p>Location: {client.location}</p>
                <p>Currency: {client.currency}</p>
                <button
                  onClick={() => deleteClient(client.client_id)}
                  className="mt-2 px-4 py-2 border rounded bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
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
