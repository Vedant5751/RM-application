import React, { useState } from "react";

export default function AccountForm({ onClose }) {
  const [accountID, setAccountID] = useState("");
  const [accountName, setAccountName] = useState("");
  const [clientName, setClientName] = useState("");
  const [region, setRegion] = useState("");
  const [accountManager, setAccountManager] = useState("");
  const [accountBU, setAccountBU] = useState("");
  const [country, setCountry] = useState("");
  const [industryDomain, setIndustryDomain] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accountData = {
      account_id: accountID,
      account_name: accountName,
      client_name: clientName,
      region,
      account_manager: accountManager,
      account_bu: accountBU,
      country,
      industry_domain: industryDomain,
      currency,
    };

    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountData),
        }
      );

      if (response.ok) {
        alert("Account added successfully!");
        onClose();
      } else {
        const error = await response.json();
        alert(`Failed to add account: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding account:", error);
      alert("An error occurred while adding the account");
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
          onChange={(e) => setAccountID(e.target.value)}
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
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
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
          <option value="USD">RM</option>
          <option value="EUR">CS</option>
          <option value="EUR">A1</option>
          <option value="EUR">Etc</option>
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
