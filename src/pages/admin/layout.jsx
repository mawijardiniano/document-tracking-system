import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar at the top */}
      <Navbar />

      {/* Container for Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left (not fixed, so it connects with the navbar) */}
        <aside className="w-64 bg-blue-600 text-white p-6">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
