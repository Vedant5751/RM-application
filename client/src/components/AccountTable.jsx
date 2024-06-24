import React, { useState, useEffect } from "react";

export default function AccountTable() {
  const [accounts, setAccounts] = useState([]);

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

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left rtl:text-right ">
          <thead class=" uppercase bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Account Name
              </th>
              <th scope="col" class="px-6 py-3">
                Account Manager
              </th>
              <th scope="col" class="px-6 py-3">
                Business Unit
              </th>
              <th scope="col" class="px-6 py-3">
                Region
              </th>
              <th scope="col" class="px-6 py-3">
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
                  class="px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {account.account_name}
                </th>
                <td class="px-6 py-4">{account.account_manager}</td>
                <td class="px-6 py-4">{account.account_bu}</td>
                <td class="px-6 py-4">{account.region}</td>
                <td class="px-6 py-4">
                  <button
                    onClick={() => deleteAccount(account.account_id)}
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
