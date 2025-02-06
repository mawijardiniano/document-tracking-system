import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";

const Dashboard = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const add = "http://localhost:5000/api/document/add-document";
  const uploadApi = "http://localhost:5000/api/document/upload";
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [file, setFile] = useState(null);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter((doc) => doc.type === "incoming");
      const outgoingDocs = response.data.filter((doc) => doc.type === "outgoing");
      setIncoming(incomingDocs);
      setOutgoing(outgoingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  const [formData, setFormData] = useState({
    agency: "",
    name: "",
    purposeOfLetter: "",
    date: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(add, formData);
    alert("Document added successfully");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(uploadApi, formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert("File uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
        <div className="flex justify-center space-x-8">
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-6 rounded-md w-[700px]">
            <input name="agency" type="text" placeholder="Agency" value={formData.agency} onChange={handleChange} className="block w-full rounded-md px-2 py-1 border border-black" />
            <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} className="block w-full rounded-md px-2 py-1 border border-black" />
            <input name="purposeOfLetter" type="text" placeholder="Purpose" value={formData.purposeOfLetter} onChange={handleChange} className="block w-full rounded-md px-2 py-1 border border-black" />
            <input name="date" type="date" value={formData.date} onChange={handleChange} className="block w-full rounded-md px-2 py-1 border border-black" />
            <select name="type" value={formData.type} onChange={handleChange} className="block w-full rounded-md px-2 py-1 border border-black">
              <option value="">Select Type</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
            <button type="submit" className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700">Submit</button>
          </form>

          {/* File Upload Section */}
          <div className="bg-slate-50 p-6 rounded-md w-[300px] space-y-4">
            <h2 className="text-lg font-semibold">Upload Scanned Document</h2>
            <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="block w-full" />
            <button onClick={handleUpload} className="w-full rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700">Upload</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;