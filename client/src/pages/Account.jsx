import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AccountForm from "../components/AccountForm";

export default function Account() {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("https://chic-enthusiasm-production.up.railway.app/account")
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="grid grid-cols-6">
            <div className="col-span-5">
              <button className="px-4 py-2 border rounded bg-white text-gray-700">
                Accounts
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
                Add Account +
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{account.account_name}</h3>
                <p>{account.region}</p>
                <p>{account.client_name}</p>
                <p>{account.account_bu}</p>
              </div>
            ))}
          </div>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
                <AccountForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
