import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const activeClasses =
    "bg-blue-200 text-blue-700"; // Classes applied when active
  const baseClasses =
    "block p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700";

  return (
    <div className="flex flex-col overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/incoming"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Incoming
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/outgoing"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Outgoing
            </NavLink>
          </li>
          <li>
            <button
              className="w-full text-left p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
