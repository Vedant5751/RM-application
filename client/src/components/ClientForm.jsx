import React, { useState } from 'react';

export default function ClientForm({ onClose }) {
  const [clientID, setClientID] = useState('');
  const [clientName, setClientName] = useState('');
  const [currency, setCurrency] = useState('');
  const [BU, setBU] = useState('');
  const [location, setLocation] = useState('');
  const [billingMethod, setBillingMethod] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

  const clientData = {
    client_id: clientID,
    client_name: clientName,
    currency,
    BU,
    location,
    billing_method: billingMethod,
    email,
    first_name: firstName,
    last_name: lastName,
  };

  try {
    const response = await fetch(
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
      alert("Client added successfully!");
      onClose();
    } else {
      const contentType = response.headers.get("content-type");
      let error;
      if (contentType && contentType.includes("application/json")) {
        error = await response.json();
      } else {
        error = { message: await response.text() };
      }
      alert(`Failed to add client: ${error.message}`);
    }
  } catch (error) {
    console.error("Error adding client:", error);
    alert("An error occurred while adding the client");
  }
};
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Client ID:</label>
        <input
          type="text"
          value={clientID}
          onChange={(e) => setClientID(e.target.value)}
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

        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">BU:</label>
        <select
          value={BU}
          onChange={(e) => setBU(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="USD">RM</option>
          <option value="EUR">CS</option>
          <option value="EUR">A1</option>
          <option value="EUR">Etc</option>

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
          value={email}
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
