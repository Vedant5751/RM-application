import {useEffect , useState} from "react";

export default function ClientTable() {

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
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left rtl:text-right ">
          <thead class=" uppercase bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Client Name
              </th>
              <th scope="col" class="px-6 py-3">
                Business Unit
              </th>
              <th scope="col" class="px-6 py-3">
                Location
              </th>
              <th scope="col" class="px-6 py-3">
                Currency
              </th>
              <th scope="col" class="px-6 py-3">
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
                  class="px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {client.client_name}
                </th>
                <td class="px-6 py-4">{client.bu}</td>
                <td class="px-6 py-4">{client.location}</td>
                <td class="px-6 py-4">{client.currency}</td>
                <td class="px-6 py-4">
                  <button
                    onClick={() => deleteClient(client.client_id)}
                    className="mt-2 px-4 py-2 border rounded bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}
