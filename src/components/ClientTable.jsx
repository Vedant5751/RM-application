import React from 'react';

const ClientTable = () => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-2 border-b border-gray-200">Client Name</th>
            <th className="px-4 py-2 border-b border-gray-200">Contact Person</th>
            <th className="px-4 py-2 border-b border-gray-200">Contact Info</th>
            <th className="px-4 py-2 border-b border-gray-200">Industry</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-gray-200">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 border-b border-gray-200">Client_Name{index + 1}</td>
              <td className="px-4 py-2 border-b border-gray-200"></td>
              <td className="px-4 py-2 border-b border-gray-200"></td>
              <td className="px-4 py-2 border-b border-gray-200"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

