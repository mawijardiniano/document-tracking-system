import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../App.css";
const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Document Tracking System</h1>
        <div className="space-x-2">
          <input
            type="text"
            placeholder="Tracking Number"
            className="p-1 rounded-md text-gray-900  bg-white border-1 border-white"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button className="bg-gray-800 p-2 rounded-md border">Search</button>
        </div>
      </header>

      <main className="flex flex-grow justify-center items-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document Submission Form */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Submit Document (For Guest)</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
              <input type="text" placeholder="School / Office" className="w-full p-2 border rounded" />
              <select className="w-full p-2 border rounded">
                <option>--Select Document Type--</option>
              </select>
              <textarea placeholder="Details: Description, Date, Destination" className="w-full p-2 border rounded" />
              <textarea placeholder="Purpose of Submission" className="w-full p-2 border rounded" />
              <select className="w-full p-2 border rounded">
                <option>--Select Receiving Unit--</option>
              </select>
              <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Submit</button>
            </form>
          </div>

          {/* Admin Login */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Log In (For DepEd Personnel)</h2>
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
              <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
              <div className="flex justify-between">
                <button type="button" className="bg-gray-300 p-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center p-4 mt-auto">
        &copy; 2025 DOST Marinduque  All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
