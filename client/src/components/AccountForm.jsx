import React, { useState, useEffect } from "react";

export default function AccountForm({ onClose }) {
  const [accountID, setAccountID] = useState("");
  const [accountName, setAccountName] = useState("");
  const [region, setRegion] = useState("");
  const [accountManager, setAccountManager] = useState("");
  const [accountBU, setAccountBU] = useState("");
  const [country, setCountry] = useState("");
  const [industryDomain, setIndustryDomain] = useState("");
  const [currency, setCurrency] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    if (account) {
      
    }
  })

  useEffect(() => {
    fetchAccountData();

    fetch("https://chic-enthusiasm-production.up.railway.app/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch("https://chic-enthusiasm-production.up.railway.app/account");
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
        generateAccountID(data.length); // Generate account ID based on the current number of accounts
      } else {
        console.error('Failed to fetch account data');
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  const generateAccountID = (accountCount) => {
    const paddedID = String(accountCount + 1).padStart(4, '0'); // Increment the account count and pad it with zeros
    setAccountID(`AC${paddedID}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accountData = {
      account_id: accountID,
      account_name: accountName,
      client_id: clientId,
      region,
      account_manager: accountManager,
      account_bu: accountBU,
      country,
      industry_domain: industryDomain,
      currency,
    };

    try {
      const response = accountID
        ? await fetch(
            `https://chic-enthusiasm-production.up.railway.app/client/${clientID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(accountData),
            }
          )
        : await fetch(
            "https://chic-enthusiasm-production.up.railway.app/client",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(accountData),
            }
          );

      if (response.ok) {
        alert("Account saved successfully!");
        onClose();
      } else {
        const errorMessage = await response.text();
        alert("Failed to save account: " + errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the account.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-md bg-white"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account ID:
        </label>
        <input
          type="text"
          value={accountID}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Name:
        </label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Client Name:
        </label>
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.client_id} value={client.client_id}>
              {client.client_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Region:
        </label>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Manager:
        </label>
        <input
          type="text"
          value={accountManager}
          onChange={(e) => setAccountManager(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account BU:
        </label>
        <select
          value={accountBU}
          onChange={(e) => setAccountBU(e.target.value)}
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
        <label className="block text-sm font-medium text-gray-700">
          Country:
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Industry Domain:
        </label>
        <input
          type="text"
          value={industryDomain}
          onChange={(e) => setIndustryDomain(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Currency:
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          {/* Add more currency options as needed */}
        </select>
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
