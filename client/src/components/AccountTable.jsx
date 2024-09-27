import React, { useState, useEffect } from "react";
import AccountForm from "./AccountForm";
import AccountInfo from "./AccountInfo";

export default function AccountTable({ searchTerm }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage] = useState(10); // Number of accounts per page

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/account"
      );
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
      const response = await fetch(
        `https://chic-enthusiasm-production.up.railway.app/account/${accountId}`,
        {
          method: "DELETE",
        }
      );

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

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter((account) =>
    account.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // Slice accounts for the current page
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="relative overflow-x-auto p-2 sm:rounded-lg">
        <table className="w-full text-left rtl:text-right ">
          <thead className="uppercase bg-gray-700 dark:text-gray-400">
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
          <tbody>
            {paginatedAccounts.map((account) => (
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
                <td className="flex px-6 py-4 justify-center">
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
            ))}
          </tbody>
        </table>
        {selectedAccount && (
          <AccountInfo
            account={selectedAccount}
            onClose={() => setSelectedAccount(null)}
          />
        )}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto">
              <AccountForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}
