import React, { useState, useEffect } from 'react';

export default function ClientForm({ client, onClose }) {
  const [clientID, setClientID] = useState('');
  const [clientName, setClientName] = useState('');
  const [currency, setCurrency] = useState('');
  const [bu, setBU] = useState('');
  const [location, setLocation] = useState('');
  const [billingMethod, setBillingMethod] = useState('');
  const [email_id, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (client) {
      setClientID(client.client_id || "");
      setClientName(client.client_name || "");
      setCurrency(client.currency || "");
      setBU(client.bu || "");
      setBillingMethod(client.billing_method || "");
      setEmail(client.email_id || "");
      setFirstName(client.first_name || "");
      setLastName(client.last_name || "");
      setLocation(client.location || "");
    }
  }, [client]);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const response = await fetch("https://chic-enthusiasm-production.up.railway.app/client");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
        generateClientID(data.length); // Generate client ID based on the current number of clients
      } else {
        console.error('Failed to fetch client data');
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const generateClientID = (clientCount) => {
    const paddedID = String(clientCount + 1).padStart(3, '0'); // Increment the client count and pad it with zeros
    setClientID(`CL${paddedID}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clientData = {
      client_id: clientID,
      client_name: clientName,
      currency,
      bu,
      location,
      billing_method: billingMethod,
      email_id,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = clientID
        ? await fetch(
            `https://chic-enthusiasm-production.up.railway.app/client/${clientID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clientData),``
            }
          )
        : await fetch(
            "https://chic-enthusiasm-production.up.railway.app/client",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clientData),
            }
          );

      if (response.ok) {
        alert("Client saved successfully!");
        onClose();
      } else {
        const errorMessage = await response.text();
        alert("Failed to save client: " + errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the client.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Client ID:</label>
        <input
          type="text"
          value={clientID}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Client Name:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Currency:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">BU:</label>
        <select
          value={bu}
          onChange={(e) => setBU(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="RM">RM</option>
          <option value="CS">CS</option>
          <option value="A1">A1</option>
          <option value="Etc">Etc</option>
          {/* Add more BU options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Billing Method:</label>
        <select
          value={billingMethod}
          onChange={(e) => setBillingMethod(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          {/* Add more billing methods as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email Id:</label>
        <input
          type="email"
          value={email_id}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded bg-gray-300 text-gray-700 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border rounded bg-blue-700 text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
