import { useEffect, useState } from "react";
import ClientInfo from "./ClientInfo";
import ClientForm from "./ClientForm";

export default function ClientTable({ searchQuery }) {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        setClients(clients.filter((client) => client.client_id !== clientId));
      } else {
        const error = await response.json();
        alert(`Failed to delete client: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("An error occurred while deleting the client");
    }
  };

  // Filter clients based on search query
  const filteredClients = clients.filter((client) =>
    client.client_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate filtered clients
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg p-2">
        <table className="w-full text-left rtl:text-right ">
          <thead className="uppercase bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Client Name
              </th>
              <th scope="col" className="px-6 py-3">
                Business Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((client) => (
              <tr
                key={client.client_id}
                className="hover:bg-gray-600 dark:bg-gray-400 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {client.client_name}
                </th>
                <td className="px-6 py-4">{client.bu}</td>
                <td className="px-6 py-4">{client.location}</td>
                <td className="px-6 py-4">{client.currency}</td>
                <td className="flex px-6 py-4 justify-center">
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="hover:bg-green-400 mt-2 px-6 py-2 mr-2 border rounded bg-green-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClient(client.client_id)}
                    className="hover:bg-red-500 mt-2 px-4 py-2 border rounded bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedClient && (
          <ClientInfo
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
              <ClientForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
