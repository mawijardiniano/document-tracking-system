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
        <h1 className="relative text-4xl font-bold text-white flex self-start px-30 pt-5">
          Document Dashboard
        </h1>

        <div className="flex flex-row space-x-8 pt-4">
          <div className="bg-blue-400 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">
              Incoming Documents
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {incoming.length}
            </p>
          </div>
          <div className="bg-blue-500 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">
              Outgoing Documents
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {outgoing.length}
            </p>
          </div>
          <div className="bg-blue-600 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white">
              Total Documents
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {total.length}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mt-4 flex-col">
  <div>
    <h1 className="text-3xl text-white relative font-bold pb-4">
      Add New Document
    </h1>
  </div>
  <form
    onSubmit={handleSubmit}
    className="glassmorphism-container-dashboard-form space-y-4 relative z-10 p-6 rounded-md"
  >
    <div className="flex flex-row space-x-4 items-center justify-center">
      <div className="space-y-1 w-full">
        <label className="text-white font-medium">Agency</label>
        <input
          name="agency"
          type="text"
          placeholder="Enter agency name"
          value={formData.agency}
          onChange={handleChange}
          className="block rounded-md px-2 py-2 border border-black bg-white bg-opacity-50 w-full"
        />
        <label className="text-white font-medium">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
        />
        <label className="text-white font-medium">Purpose of Letter</label>
        <input
          name="purposeOfLetter"
          type="text"
          placeholder="Describe the purpose of this request"
          value={formData.purposeOfLetter}
          onChange={handleChange}
          className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
        />
      </div>
      <div className="space-y-1 w-full">
        <label className="text-white font-medium">Code</label>
        <input
          name="code"
          type="text"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
        />
        <label className="text-white font-medium">Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="block w-full rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
        />
        <label className="text-white font-medium">Document Type</label>
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
      </div>
    </div>


    <div>
      <h1 className="text-white font-medium">Upload Document</h1>
      <input
        type="file"
        name="document"
        onChange={handleFileChange}
        className="block w-[485px] rounded-md px-2 py-2 border border-black bg-white bg-opacity-50"
      />
    </div>

    <button
      type="submit"
      className="w-60 rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
    >
      Submit
    </button>
  </form>
</div>
      </div>
    </DasboardLayout>
  );
};

export default Dashboard;
