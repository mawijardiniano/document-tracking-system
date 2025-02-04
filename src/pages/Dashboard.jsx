import React, { useState, useEffect } from "react";
import axios from "axios";
const Dashboard = () => {
  const [incoming, setIncoming] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const api = " http://localhost:5000/api/document/get-document";
  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);

      const incomingDocs = response.data.filter(
        (document) => document.type === "incoming"
      );
      const outgoingDocs = response.data.filter(
        (document) => document.type === "outgoing"
      );

      setIncoming(incomingDocs.length);
      setOutgoing(outgoingDocs.length);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);
  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return (
          <div>
            <p className="text-2xl font-semibold">Dashboard Overview</p>
            <div className="flex flex-row space-x-2">
              <div className="bg-blue-400 w-72 h-36 rounded-lg flex items-center justify-center">
                <p className="text-2xl font-bold">{incoming}</p>
              </div>
              <div className="bg-blue-500 w-72 h-36 rounded-lg  flex items-center justify-center">
                <p className="text-2xl font-bold">{outgoing}</p>
              </div>
              <div className="bg-blue-600 w-72 h-36 rounded-lg flex items-center justify-center">
                <p className="text-2xl font-bold">{incoming}</p>
              </div>
              <div className="bg-blue-700 w-72   h-36 rounded-lg  flex items-center justify-center">
                <p className="text-2xl font-bold">{outgoing}</p>
              </div>
            </div>
          </div>
        );
      case "incoming":
        return <h1 className="text-2xl font-semibold">Incoming Documents</h1>;
      case "outgoing":
        return <h1 className="text-2xl font-semibold">Outgoing Documents</h1>;
      case "logout":
        return (
          <h1 className="text-2xl font-semibold text-red-500">
            Logging out...
          </h1>
        );
      default:
        return (
          <h1 className="text-2xl font-semibold">Welcome to the Admin Panel</h1>
        );
    }
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "incoming", label: "Incoming" },
    { key: "outgoing", label: "Outgoing" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <div className="h-screen flex">
      <aside className="w-64 bg-blue-600 text-white p-6 fixed h-full">
        <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {menuItems.map(({ key, label }) => (
              <li key={key}>
                <button
                  className={`block w-full text-left p-2 rounded-md hover:bg-blue-700 ${
                    selectedPage === key ? "bg-blue-800" : ""
                  }`}
                  onClick={() => setSelectedPage(key)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
