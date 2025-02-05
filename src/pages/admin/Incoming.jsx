import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";
const Incoming = () => {

  const api = "http://localhost:5000/api/document/get-document";
  const [incoming, setIncoming] = useState([]);
  
  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter((doc) => doc.type === "incoming");
  
      setIncoming(incomingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  
  useEffect(() => {
    fetchDocument();
  }, []);
  return (
    <Layout>

      {/* Main Content */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Welcome to the Incoming</h1>
        {incoming.length > 0 ? (
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-1 border">Agency</th>
              <th className="px-4 py-1 border">Name</th>
              <th className="px-4 py-1 border">Purpose Of Letter</th>
              <th className="px-4 py-1 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {incoming.map((doc) => (
              <tr key={doc._id} className="border-b hover:bg-gray-100 text-center">
                <td className="px-4 py-1 border text-sm">{doc.agency}</td>
                <td className="px-4 py-1 border text-sm">{doc.name}</td>
                <td className="px-4 py-1 border text-sm">{doc.purposeOfLetter}</td>
                <td className="px-4 py-1 border text-sm">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No documents available</p>
      )}
      </div>
    </Layout>
  );
};

export default Incoming;
