import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";

const Incoming = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const [incoming, setIncoming] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [formData, setFormData] = useState({
    agency: "",
    name: "",
    purposeOfLetter: "",
    date: "",
    type: "",
  });

  const [editDoc, setEditDoc] = useState(null);

  // Fetch documents on initial load
  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter(
        (doc) => doc.type === "incoming"
      );
      setIncoming(incomingDocs);
      setFilteredDocs(incomingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  // Delete document handler
  const deleteDocument = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/document/delete-document/${id}`
      );
      setIncoming(incoming.filter((doc) => doc._id !== id));
      setFilteredDocs(filteredDocs.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Save edited document
  const saveEdit = async () => {
    try {
      // Send the updated document to the backend
      await axios.put(
        `http://localhost:5000/api/document/update-document/${editDoc._id}`,
        editDoc
      );

      // Update local states with the edited document
      setIncoming(
        incoming.map((doc) => (doc._id === editDoc._id ? editDoc : doc))
      );
      setFilteredDocs(
        filteredDocs.map((doc) => (doc._id === editDoc._id ? editDoc : doc))
      );

      // Reset edit state
      setEditDoc(null);
      setFormData({
        agency: "",
        name: "",
        purposeOfLetter: "",
        date: "",
        type: "",
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Start editing a document
  const handleEdit = (doc) => {
    setEditDoc(doc);
    setFormData({
      agency: doc.agency,
      name: doc.name,
      purposeOfLetter: doc.purposeOfLetter,
      date: doc.date,
      type: doc.type,
    });
  };

  // Filter documents by agency
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    const filtered = incoming.filter((doc) =>
      doc.agency.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDocs(filtered);
  };

  return (
    <Layout>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-semibold">Incoming Documents</h1>

        <input
          type="text"
          placeholder="Filter by agency..."
          value={filterText}
          onChange={handleFilterChange}
          className="p-2 border rounded my-3"
        />

        {filteredDocs.length > 0 ? (
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-1 border">Agency</th>
                <th className="px-4 py-1 border">Name</th>
                <th className="px-4 py-1 border">Purpose Of Letter</th>
                <th className="px-4 py-1 border">Date</th>
                <th className="px-4 py-1 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  {editDoc && editDoc._id === doc._id ? (
                    <>
                      <td className="px-4 py-1 border text-sm">
                        <input
                          type="text"
                          value={editDoc.agency}
                          onChange={(e) =>
                            setEditDoc({ ...editDoc, agency: e.target.value })
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="px-4 py-1 border text-sm">
                        <input
                          type="text"
                          value={editDoc.name}
                          onChange={(e) =>
                            setEditDoc({ ...editDoc, name: e.target.value })
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="px-4 py-1 border text-sm">
                        <input
                          type="text"
                          value={editDoc.purposeOfLetter}
                          onChange={(e) =>
                            setEditDoc({
                              ...editDoc,
                              purposeOfLetter: e.target.value,
                            })
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="px-4 py-1 border text-sm">
                        <input
                          type="date"
                          value={editDoc.date}
                          onChange={(e) =>
                            setEditDoc({ ...editDoc, date: e.target.value })
                          }
                          className="border p-1"
                        />
                      </td>
                      <td className="px-4 py-1 border text-sm">
                        <button
                          onClick={saveEdit}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditDoc(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-1 border text-sm">{doc.agency}</td>
                      <td className="px-4 py-1 border text-sm">{doc.name}</td>
                      <td className="px-4 py-1 border text-sm">
                        {doc.purposeOfLetter}
                      </td>
                      <td className="px-4 py-1 border">
                        {new Date(doc.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-4 py-1 border text-sm">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDocument(doc._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
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

export default Incoming;
