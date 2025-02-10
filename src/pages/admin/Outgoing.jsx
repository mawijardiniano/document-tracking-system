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
  const [setOpen, setIsOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const itemsPerPage = 15;

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
        selectedMonth === "All" || date.getMonth().toString() === selectedMonth;
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
  }, [selectedYear, selectedMonth, filterText, outgoing]);

  const uniqueYears = [
    ...new Set(
      outgoing.map((doc) => new Date(doc.date).getFullYear().toString())
    ),
  ];
  uniqueYears.sort((a, b) => a - b);
  const uniqueMonths = [
    ...new Set(outgoing.map((doc) => new Date(doc.date).getMonth().toString())),
  ];
  uniqueMonths.sort((a, b) => a - b);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const deleteDocument = async (id) => {
    if (!id) {
      console.error("Error: Document ID is null or undefined");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/document/delete-document/${id}`
      );
      setOutgoing((prev) => prev.filter((doc) => doc._id !== id));
      setFilteredDocs((prev) => prev.filter((doc) => doc._id !== id));
      setIsOpen(false);
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
      setOutgoing(
        outgoing.map((doc) => (doc._id === editDoc._id ? editDoc : doc))
      );
      setFilteredDocs(
        filteredDocs.map((doc) => (doc._id === editDoc._id ? editDoc : doc))
      );
      setEditDoc(null);
      setFormData({
        agency: "",
        name: "",
        code: "",
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
      code: doc.code,
      purposeOfLetter: doc.purposeOfLetter,
      date: doc.date,
      type: doc.type,
    });
  };

  const handlePrintPreview = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write("<html><head><title>Document Preview</title>");
    printWindow.document.write(
      `<style>
        /* Reset margin and padding */
        body, html { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 0; 
          font-size: 12px; 
          width: 100%; 
          height: 100%;
          text-align: center; /* Center align all content on the page */
        }
  
        /* Table styles */
        table { 
          width: 80%; /* Table width reduced to 80% for better alignment */
          margin: 0 auto; /* Centers the table */
          border-collapse: collapse; 
          table-layout: auto;
        }
        table, th, td { 
          border: 1px solid black; 
        }
        th, td { 
          padding: 6px; 
          text-align: center; /* Center align text in all cells */
          font-size: 12px; 
        }
        th { 
          background-color: #f2f2f2; 
        }
  
        /* Column widths */
        .agency-column { width: 20%; }
        .name-column { width: 25%; }
        .purpose-column { 
          width: 40%; /* Allow the Purpose column to take up more space */
          word-wrap: break-word; 
          white-space: normal; 
        }
        .date-column { width: 20%; }
  
        /* Printing specific styles */
        @media print {
          /* Set margins for printing */
          @page { 
            margin: 10mm; /* Set the page margin to 10mm */
          }
  
          /* Ensure everything is aligned to the full width of the page */
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            text-align: center; /* Ensure text is centered for printing as well */
          }
  
          table {
            width: 100%; /* Ensure the table takes full width */
            page-break-inside: avoid;
            margin: 0 auto; /* Ensure the table stays centered */
          }
  
          /* Scale content to fit the page without overflowing */
          body {
            transform: scale(1); /* Ensure normal scaling to avoid content shrinking */
            transform-origin: top left;
          }
  
          /* Make sure the content doesn't overflow */
          .purpose-column {
            white-space: normal;
            word-wrap: break-word;
          }
        }
      </style>`
    );
    printWindow.document.write("</head><body><h2>Outgoing Documents</h2>");

    printWindow.document.write(
      "<table><thead><tr><th class='agency-column'>Agency</th><th class='name-column'>Name</th><th class='purpose-column'>Purpose</th><th class='date-column'>Date</th></tr></thead><tbody>"
    );

    filteredDocs.forEach((doc) => {
      printWindow.document.write(
        `<tr>
          <td class='agency-column'>${doc.agency}</td>
          <td class='name-column'>${doc.name}</td>
          <td class='purpose-column'>${doc.purposeOfLetter}</td>
          <td class='date-column'>${formatDate(doc.date)}</td>
        </tr>`
      );
    });

    printWindow.document.write("</tbody></table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
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
        <div>
          <h1 className="text-3xl font-semibold py-3">Outgoing Documents</h1>
        </div>
        <div className="flex flex-row items-center justify-between py-2">
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
          <button
            onClick={handlePrintPreview}
            className="px-3 py-1.5 bg-black text-white rounded ml-2"
          >
            Print Preview
          </button>
        </div>

        {filteredDocs.length > 0 ? (
          <>
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-1 py-1 border border-gray-200 w-50">
                    Agency
                  </th>
                  <th className="px-1 py-1 border border-gray-200 w-40">
                    Name
                  </th>
                  <th
                    className="px-1 py-1 border border-gray-200"
                    style={{ width: "300px" }}
                  >
                    Purpose Of Letter
                  </th>
                  <th className="px-1 py-1 border border-gray-200 w-30">
                    Code
                  </th>
                  <th className="px-1 py-1 border border-gray-200 w-40">
                    Date
                  </th>
                  <th className="px-1 py-1 border border-gray-200 w-40">
                    Actions
                  </th>
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
                        <td
                          className="px-4 py-1 border border-gray-200 text-sm"
                          style={{
                            width: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
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
                            type="text"
                            value={editDoc.code}
                            onChange={(e) =>
                              setEditDoc({
                                ...editDoc,
                                code: e.target.value,
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
                        <td className="px-4 py-1 border border-gray-200 text-sm">
                          {doc.code}
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
                            onClick={() => {
                              setSelectedDocId(doc._id);
                              setIsOpen(true);
                            }}
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
            <div className="bg-gray-500 ">
              {setOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-90">
                    <p className="font-medium">
                      Are you sure you want to delete?
                    </p>
                    <p>
                      This will permanently delete the item and remove it from
                      our servers.
                    </p>
                    <div className="w-full flex justify-end items-end space-x-2">
                      <button
                        onClick={() => deleteDocument(selectedDocId)}
                        className="bg-red-500 text-white px-4 py-2 w-20 rounded mt-4"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white text-black border border-gray-400 px-4 py-2 rounded mt-4"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No documents available
          </p>
        )}
        <div className="sticky top-0 z-10 w-full py-6 px-6 bg-white shadow-sm">
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
      </div>
    </Layout>
  );
};

export default Outgoing;
