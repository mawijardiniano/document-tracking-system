import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";
const Outgoing = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const [outgoing, setOutgoing] = useState([]);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const outgoingDocs = response.data.filter(
        (doc) => doc.type === "outgoing"
      );

      setOutgoing(outgoingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-medium mb-4">Outgoing Documents</h1>
        {outgoing.length > 0 ? (
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
              {outgoing.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  <td className="px-4 py-1 border">{doc.agency}</td>
                  <td className="px-4 py-1 border">{doc.name}</td>
                  <td className="px-4 py-1 border">{doc.purposeOfLetter}</td>
                  <td className="px-4 py-1 border">
                    {new Date(doc.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No documents available
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Outgoing;
