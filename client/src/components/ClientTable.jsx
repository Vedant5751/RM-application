import { useEffect, useState } from "react";
import ClientInfo from "./ClientInfo";
import ClientForm from "./ClientForm";


export default function ClientTable() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);


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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left rtl:text-right ">
          <thead className=" uppercase bg-gray-700 dark:text-gray-400">
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
          {clients.map((client) => (
            <tbody>
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
                <td className=" flex px-6 py-4 justify-center">
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
            </tbody>
          ))}
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
        </table>
      </div>
    </>
  );
}
