import React, { useState, useEffect } from "react";
import AccountForm from "./AccountForm";
import AccountInfo from "./AccountInfo";
import endpoint from "../../endpoints";

export default function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(endpoint.account.getAllAccounts);
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
      } else {
        console.error("Failed to fetch account data");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      const response = await fetch(endpoint.account.deleteAccount(accountId), {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully!");
        fetchAccountData();
      } else {
        const error = await response.json();
        alert(`Failed to delete account: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account");
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left rtl:text-right ">
          <thead className=" uppercase bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Account Name
              </th>
              <th scope="col" className="px-6 py-3">
                Account Manager
              </th>
              <th scope="col" className="px-6 py-3">
                Business Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Region
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {accounts.map((account) => (
            <tbody>
              <tr
                key={account.account_id}
                className="hover:bg-gray-600 dark:bg-gray-400 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {account.account_name}
                </th>
                <td className="px-6 py-4">{account.account_manager}</td>
                <td className="px-6 py-4">{account.account_bu}</td>
                <td className="px-6 py-4">{account.region}</td>
                <td className=" flex px-6 py-4 justify-center">
                  <button
                    onClick={() => setSelectedAccount(account)}
                    className="hover:bg-green-400 mt-2 px-6 py-2 mr-2 border rounded bg-green-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAccount(account.account_id)}
                    className="hover:bg-red-500 mt-2 px-4 py-2 border rounded bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
          {selectedAccount && (
            <AccountInfo
              account={selectedAccount}
              onClose={() => setSelectedAccount(null)}
            />
          )}
          {showAccount && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
                <AccountForm onClose={() => setShowAccount(false)} />
              </div>
            </div>
          )}
        </table>
      </div>
    </>
  );
}
