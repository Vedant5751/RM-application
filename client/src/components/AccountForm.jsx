import React, { useState, useEffect } from "react";
import endpoint from "../../endpoints";

export default function AccountForm({ account, onClose }) {
  const [accountID, setAccountID] = useState("");
  const [accountName, setAccountName] = useState("");
  const [clientId, setClientId] = useState("");
  const [region, setRegion] = useState("");
  const [accountManager, setAccountManager] = useState("");
  const [accountBU, setAccountBU] = useState("");
  const [country, setCountry] = useState("");
  const [industryDomain, setIndustryDomain] = useState("");
  const [currency, setCurrency] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientname, setClientName] = useState("");

  useEffect(() => {
    if (account) {
      setAccountID(account.account_id || "");
      setAccountName(account.account_name || "");
      setClientId(account.client_name || "");
      setRegion(account.region || "");
      setAccountManager(account.account_manager || "");
      setAccountBU(account.account_bu || "");
      setCountry(account.country || "");
      setIndustryDomain(account.industry_domain || "");
      setCurrency(account.currency || "");
    }
  }, [account]);

  useEffect(() => {
    fetchAccountData();
    fetch("https://chic-enthusiasm-production.up.railway.app/client")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/account"
      );
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
        if (data.length > 0 && !account) {
          const latestAccountID = getLatestAccountID(data);
          generateAccountID(latestAccountID);
        } else if (account) {
          setAccountID(account.account_id);
        } else {
          generateAccountID(0);
        }
      } else {
        console.error("Failed to fetch Account data");
      }
    } catch (error) {
      console.error("Error fetching Account data:", error);
    }
  };

  const getLatestAccountID = (accounts) => {
    const ids = accounts.map((account) =>
      parseInt(account.account_id.replace("AC", ""), 10)
    );
    return Math.max(...ids);
  };

  const generateAccountID = (latestID) => {
    const newID = latestID + 1;
    const paddedID = String(newID).padStart(4, "0");
    setAccountID(`AC${paddedID}`);
  };

  const handleClientChange = (e) => {
    const selectedClientName = e.target.value;
    setClientName(selectedClientName);

    // Find the selected client in the clients array
    const selectedClient = clients.find(
      (client) => client.client_name === selectedClientName
    );

    // Set the Account BU, Country, and Currency based on the selected client
    if (selectedClient) {
      setAccountBU(selectedClient.bu || ""); 
      setCountry(selectedClient.location || ""); 
      setCurrency(selectedClient.currency || ""); 
    } else {
      setAccountBU("");
      setCountry("");
      setCurrency("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accountData = {
      account_id: accountID,
      account_name: accountName,
      client_name: clientname,
      region,
      account_manager: accountManager,
      account_bu: accountBU,
      country,
      industry_domain: industryDomain,
      currency,
    };

    try {
      const response = account
        ? await fetch(
            `https://chic-enthusiasm-production.up.railway.app/account/${accountID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(accountData),
            }
          )
        : await fetch(
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
          Client Name:
        </label>
        <select
          value={clientname}
          onChange={handleClientChange} // Update the change handler
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.client_id} value={client.client_name}>
              {client.client_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Country:
        </label>
        <input
          type="text"
          value={country}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Currency:
        </label>
        <input
          type="text"
          value={currency}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
        <input
          type="text"
          value={accountBU}
          readOnly 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
