import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";

const Outgoing = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const [outgoing, setOutgoing] = useState([]);
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
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const outgoingDocs = response.data.filter(
        (doc) => doc.type === "outgoing"
      );

      setOutgoing(outgoingDocs);
      setFilteredDocs(outgoingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);
  const applyFilter = () => {
      const filtered = outgoing.filter((doc) => {
        const date = new Date(doc.date);  
        const yearMatch =
          selectedYear === "All" ||
          date.getFullYear().toString() === selectedYear;
        const monthMatch =
          selectedMonth === "All" ||
          date.getMonth().toString() === selectedMonth;
        const agencyMatch = doc.agency
          .toLowerCase()
          .includes(filterText.toLowerCase());
        return yearMatch && monthMatch && agencyMatch;
      });
      setFilteredDocs(filtered);
      setCurrentPage(1); // Reset page whenever filters change
    };
  
    useEffect(() => {
      applyFilter();
    }, [selectedYear, selectedMonth, filterText, outgoing]);
  
    // Get unique years and months from incoming documents
    const uniqueYears = [
      ...new Set(outgoing.map((doc) => new Date(doc.date).getFullYear().toString())),
    ];
    uniqueYears.sort((a, b) => a - b);
    const uniqueMonths = [
      ...new Set(outgoing.map((doc) => new Date(doc.date).getMonth().toString())),
    ];
    uniqueMonths.sort((a, b) => a - b);
  
    // Map month numbers (0-indexed) to month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
  
    // Delete document handler
    const deleteDocument = async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/document/delete-document/${id}`
        );
        setOutgoing(outgoing.filter((doc) => doc._id !== id));
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
        setOutgoing(
          outgoing.map((doc) => (doc._id === editDoc._id ? editDoc : doc))
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
        <h1 className="text-2xl font-medium mb-4">Outgoing Documents</h1>
        <input
          type="text"
          placeholder="Filter by agency..."
          value={filterText}
          onChange={handleFilterChange}
          className="p-2 border rounded my-3"
        />
        {outgoing.length > 0 ? (
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
              {outgoing.map((doc) => (
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

export default Outgoing;
