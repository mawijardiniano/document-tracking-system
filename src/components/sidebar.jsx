import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, FileSymlink, LogOut, FileOutput, FileInput, HomeIcon } from 'lucide-react';
import Dashboard from '../pages/admin/Dashboard';

const Sidebar = () => {
  const activeClasses = "bg-blue-200 text-blue-700";
  const baseClasses = "flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700";

  return (
    <div className="flex flex-col overflow-hidden">
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}
            >
              <HomeIcon size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/incoming"
              className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}
            >
              <FileInput size={20} /> Incoming Documents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/outgoing"
              className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}
            >
              <FileOutput size={20} /> Outgoing Documents
            </NavLink>
          </li>
          <li>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700">
              <LogOut size={20} /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
