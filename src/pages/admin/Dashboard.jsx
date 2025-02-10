import React, { useState, useEffect } from "react";
import axios from "axios";
import DasboardLayout from "./dashboardLayout";
import AdminBG from "../../assets/bg2.jpg";
import "../../App.css";
import { FileDown, FileUp, Files, FilePlus, UploadCloud } from "lucide-react";

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

      setTotal(response.data);
      setIncoming(incomingDocs);
      setOutgoing(outgoingDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, document: file });
  };
  

  const [formData, setFormData] = useState({
    agency: "",
    name: "",
    code: "",
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
        code: "",
        purposeOfLetter: "",
        date: "",
        type: "",
      });

      fetchDocument();
    } catch (error) {
      console.error("Error adding document:", error);
    }
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
    <DasboardLayout>
      <div
        className="h-screen flex flex-col items-center bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${AdminBG})` }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-85"></div>
        <div className="flex flex-row space-x-8 pt-8">
          <div className="bg-blue-400 relative w-80 h-40 rounded-md flex flex-col items-center justify-center text-white">
            <FileDown size={40} />
            <p className="font-medium text-2xl">Incoming Documents</p>
            <p className="text-4xl font-medium">{incoming.length}</p>
          </div>
          <div className="bg-blue-500 relative w-80 h-40 rounded-md flex flex-col items-center justify-center text-white">
            <FileUp size={40} />
            <p className="font-medium text-2xl">Outgoing Documents</p>
            <p className="text-4xl font-medium">{outgoing.length}</p>
          </div>
          <div className="bg-blue-600 relative w-80 h-40 rounded-md flex flex-col items-center justify-center text-white">
            <p className="font-medium text-2xl">Total Documents</p>
            <p className="text-4xl font-medium">{total.length}</p>
            <Files size={40}/>
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
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          <div className="glassmorphism-container relative z-10 p-6 rounded-md">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="block w-full bg-white bg-opacity-50 px-4 py-2 rounded-md"
            />
            <button
              onClick={handleUpload}
              className="w-full rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700 mt-4"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </DasboardLayout>
  );
};

export default Dashboard;
