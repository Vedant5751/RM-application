import React, { useState } from 'react';

const AccountTable = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(5).fill(false));

  const handleAllCheckboxChange = () => {
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);
    setCheckedItems(new Array(5).fill(newCheckedState));
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    if (updatedCheckedItems.every(item => item)) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleAllCheckboxChange}
              />
            </th>
            <th className="px-4 py-2 border-b border-gray-200">Account Name</th>
            <th className="px-4 py-2 border-b border-gray-200">Contact Person</th>
            <th className="px-4 py-2 border-b border-gray-200">Contact Info</th>
            <th className="px-4 py-2 border-b border-gray-200">Industry</th>
          </tr>
        </thead>
        <tbody>
          {checkedItems.map((isChecked, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="px-4 py-2 border-b border-gray-200">Account_Name{index + 1}</td>
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

export default AccountTable;
