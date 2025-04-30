import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { HomeIcon, FilePlus, File, FileInput, FileOutput, Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const activeClasses = "bg-blue-200 text-blue-700";
  const baseClasses = "flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700";

  return (
    <div className="flex flex-col overflow-hidden">
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
              <HomeIcon size={20} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
              <FilePlus size={20} /> Add Documents
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/incoming" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
              <FileInput size={20} /> Incoming Documents
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/outgoing" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
              <FileOutput size={20} /> Outgoing Documents
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/regional" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
              <File size={20} /> Regional Documents
            </NavLink>
          </li>
          <li>
            <button onClick={toggleSettings} className={`${baseClasses} w-full flex justify-between`}>
              <span className="flex items-center gap-2">
                <Settings size={20} /> Settings
              </span>
              {isSettingsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isSettingsOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <NavLink to="/admin/settings/add-agency" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
                    Add Agency
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/settings/add-receiver" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ""}`}>
                    Add Receiver
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button    onClick={handleLogout} className="flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700">
              <LogOut size={20} /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
