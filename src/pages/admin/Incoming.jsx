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
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter((doc) => doc.type === "incoming");
      setIncoming(incomingDocs);
      setFilteredDocs(incomingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  const applyFilter = () => {
    const filtered = incoming.filter((doc) => {
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
    setCurrentPage(1); 
  };

  useEffect(() => {
    applyFilter();
  }, [selectedYear, selectedMonth, filterText, incoming]);

  const uniqueYears = [
    ...new Set(incoming.map((doc) => new Date(doc.date).getFullYear().toString())),
  ];
  uniqueYears.sort((a, b) => a - b);
  const uniqueMonths = [
    ...new Set(incoming.map((doc) => new Date(doc.date).getMonth().toString())),
  ];
  uniqueMonths.sort((a, b) => a - b);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/document/delete-document/${id}`);
      setIncoming(incoming.filter((doc) => doc._id !== id));
      setFilteredDocs(filteredDocs.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/document/update-document/${editDoc._id}`,
        editDoc
      );
      setIncoming(incoming.map((doc) => (doc._id === editDoc._id ? editDoc : doc)));
      setFilteredDocs(filteredDocs.map((doc) => (doc._id === editDoc._id ? editDoc : doc)));
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Layout>
      <div className="flex flex-col px-6 py-2">
        <div className="flex flex-row items-center justify-between py-2">
          <div>
            <h1 className="text-2xl font-semibold">Incoming Documents</h1>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              <option value="All">All Months</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {monthNames[parseInt(month)]}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              <option value="All">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter by agency..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="p-2 border border-gray-200 rounded"
            />
          </div>
        </div>

        {filteredDocs.length > 0 ? (
          <>
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-1 border border-gray-200">Agency</th>
                  <th className="px-4 py-1 border border-gray-200">Name</th>
                  <th className="px-4 py-1 border border-gray-200">Purpose Of Letter</th>
                  <th className="px-4 py-1 border border-gray-200">Date</th>
                  <th className="px-4 py-1 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocs.map((doc) => (
                  <tr
                    key={doc._id}
                    className="border-b border-gray-200 hover:bg-gray-100 text-center"
                  >
                    {editDoc && editDoc._id === doc._id ? (
                      <>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          <input
                            type="text"
                            value={editDoc.agency}
                            onChange={(e) =>
                              setEditDoc({ ...editDoc, agency: e.target.value })
                            }
                            className="border p-1"
                          />
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          <input
                            type="text"
                            value={editDoc.name}
                            onChange={(e) =>
                              setEditDoc({ ...editDoc, name: e.target.value })
                            }
                            className="border p-1"
                          />
                        </td>
                        <td className="px-4 py-1 border  border-gray-200 text-sm">
                          <input
                            type="text"
                            value={editDoc.purposeOfLetter}
                            onChange={(e) =>
                              setEditDoc({
                                ...editDoc,
                                purposeOfLetter: e.target.value,
                              })
                            }
                            className="border p-1 "
                          />
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          <input
                            type="date"
                            value={editDoc.date}
                            onChange={(e) =>
                              setEditDoc({ ...editDoc, date: e.target.value })
                            }
                            className="border p-1"
                          />
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
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
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          {doc.agency}
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          {doc.name}
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          {doc.purposeOfLetter}
                        </td>
                        <td className="px-4 py-1 border border-gray-200">
                          {new Date(doc.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-1 border border-gray-200 text-sm">
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
            <div className="fixed bottom-0 left-0 w-full  py-6 px-6">
    <div className="flex justify-end items-center space-x-4">
      <button 
        onClick={handlePrevPage} 
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-lg font-semibold text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>

          </>
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
