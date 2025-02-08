import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layout";
import AdminBG from "../../assets/bg2.jpg";
import "../../App.css";

const Dashboard = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const add = "http://localhost:5000/api/document/add-document";
  const uploadApi = "http://localhost:5000/api/document/upload";
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [total, setTotal] = useState([]);
  const [file, setFile] = useState(null);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const incomingDocs = response.data.filter(
        (doc) => doc.type === "incoming"
      );
      const outgoingDocs = response.data.filter(
        (doc) => doc.type === "outgoing"
      );

      setTotal(response.data)
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
    try {
      await axios.post(add, formData);
      setFormData({
        agency: "",
        name: "",
        purposeOfLetter: "",
        date: "",
        type: "",
      });

      fetchDocument();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(uploadApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Layout>
      <div
        className="h-screen flex flex-col items-center bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${AdminBG})` }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-85"></div>
        <div className="flex flex-row space-x-8 pt-8">
          <div className="glassmorphism-container-dashboard relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">Incoming</p>
            <p className="text-center text-white font-medium text-4xl">{incoming.length}</p>
          </div>
          <div className="bg-blue-500 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">Outgoing</p>
            <p className="text-center text-white font-medium text-4xl">{outgoing.length}</p>
          </div>
          <div className="bg-blue-600 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">Total</p>
            <p className="text-center text-white font-medium text-4xl">{total.length}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mt-10">
          <form
            onSubmit={handleSubmit}
            className="glassmorphism-container-dashboard-form space-y-4 relative z-10 p-6 rounded-md"
          >
            <input
              name="agency"
              type="text"
              placeholder="Agency"
              value={formData.agency}
              onChange={handleChange}
              className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
            />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
            />
            <input
              name="purposeOfLetter"
              type="text"
              placeholder="Purpose"
              value={formData.purposeOfLetter}
              onChange={handleChange}
              className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
            >
              <option value="">Select Type</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          <div className="glassmorphism-container relative z-10 p-6 rounded-md">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Upload Scanned Document
                </h2>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="block w-full bg-white bg-opacity-50 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <button
                  onClick={handleUpload}
                  className="w-full rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
