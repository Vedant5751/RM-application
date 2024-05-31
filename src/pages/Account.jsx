import React from 'react'
import Sidebar from "../components/Sidebar";
import AccountTable from "../components/AccountTable"
export default function Account() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
          <div className="grid grid-cols-6">
            <div className="col-span-5 ">
              {" "}
              <button className="px-4 py-2 border rounded bg-white text-gray-700">
                Accounts{" "}
                <span className="inline-block transform rotate-90">
                  &#x25BE;
                </span>
              </button>
            </div>
            <div className="col-span-1  mx-auto">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Account +
              </button>
            </div>
          </div>
          <div>
            <AccountTable />
          </div>
        </div>
      </div>
    </>
  );
}
