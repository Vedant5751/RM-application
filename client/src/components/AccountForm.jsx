import React, { useState } from "react";

export default function AccountForm({ onClose }) {
  const [AccountID, setAccountID] = useState("");
  const [AccountName, setAccountName] = useState("");
  const [ClientName, setClientName] = useState("");
  const [Region, setRegion] = useState("");
  const [AccountManager, setAccountManager] = useState("");
  const [AccountBU, setAccountBU] = useState("");
  const [Country, setCountry] = useState("");
  const [IndustryDomain, setIndustryDomain] = useState("");
  const [Currency, setCurrency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      AccountID,
      AccountName,
      ClientName ,
      Region,
      AccountManager,
      AccountBU,
      Country,
      IndustryDomain,
      Currency,
    });
    onClose();
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
          value={AccountID}
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
          value={AccountName}
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
          value={ClientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        ></input>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Region
        </label>
        <input
          value={Region}
          onChange={(e) => setRegion(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        ></input>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Manager:
        </label>
        <input
          type="text"
          value={AccountManager}
          onChange={(e) => setAccountManager(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account BU:
        </label>
        <input
          type="text"
          value={AccountBU}
          onChange={(e) => setAccountBU(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Country:
        </label>
        <input
          type="text"
          value={Country}
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
          value={IndustryDomain}
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
          value={Currency}
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
