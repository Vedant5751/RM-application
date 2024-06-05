// Tooltip.jsx
import React, { useState } from 'react';

const Tooltip = ({ children, title, isSidebarOpen }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  let timer;

  const handleMouseEnter = () => {
    if (!isSidebarOpen) {
      timer = setTimeout(() => {
        setShowTooltip(true);
      }, 100); // Reduced delay for showing the tooltip
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShowTooltip(false);
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className="absolute left-full ml-2 w-max bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg z-10">
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
