import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";

const Dashboard = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const add = "http://localhost:5000/api/document/add-document";
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [addDocument, setAddDocument] = useState([]);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter(
        (doc) => doc.type === "incoming"
      );
      const outgoingDocs = response.data.filter(
        (doc) => doc.type === "outgoing"
      );

      setIncoming(incomingDocs);
      setOutgoing(outgoingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  // Controlled form state
  const [formData, setFormData] = useState({
    agency: "",
    name: "",
    purposeOfLetter: "",
    date: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const response = await axios.post(add, formData);
    setAddDocument(response.data);
    console.log(response.data);
    alert("Document added successfully");
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-slate-50 p-6 rounded-md w-[700px]"
          >
            <div>
              <label
                htmlFor="agency"
                className="block text-sm font-medium text-gray-700"
              >
                Agency
              </label>
              <input
                id="agency"
                name="agency"
                type="text"
                placeholder="Agency"
                value={formData.agency}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-2 py-1 border border-black"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-2 py-1 border border-black"
              />
            </div>
            <div>
              <label
                htmlFor="purposeOfLetter"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose of Letter
              </label>
              <input
                id="purposeOfLetter"
                name="purposeOfLetter"
                type="text"
                placeholder="Purpose of Letter"
                value={formData.purposeOfLetter}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-2 py-1 border border-black"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-2 py-1 border border-black"
              />
            </div>
            {/* Dropdown for Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md px-2 py-1 border border-black"
              >
                <option value="">Select Type</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
