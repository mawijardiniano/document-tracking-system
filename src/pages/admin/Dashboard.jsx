import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import DasboardLayout from "./dashboardLayout";
import AdminBG from "../../assets/bg2.jpg";
import "../../App.css";
import { FileInput, FileOutput, Files } from "lucide-react";

const Notification = ({ message, type }) => {
  if (!message) return null;
  return (
    <div
      className={`absolute right-5 transform -translate-x-1/2 p-4 rounded-md text-white shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      style={{ zIndex: 1000 }}
    >
      {message}
    </div>
  );
};

const Dashboard = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const add = "http://localhost:5000/api/document/add-document";
  const uploadApi = "http://localhost:5000/api/document/upload";
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [total, setTotal] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [notification, setNotification] = useState(null);

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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("agency", formData.agency);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("code", formData.code);
    formDataToSend.append("purposeOfLetter", formData.purposeOfLetter);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("document", file);

    try {
      await axios.post(add, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        agency: "",
        name: "",
        code: "",
        purposeOfLetter: "",
        date: "",
        type: "",
      });
      setFile(null);

      fileInputRef.current.value = null; 
      setNotification({ message: "Document uploaded successfully!", type: "success" });

      fetchDocument();
    } catch (error) {
      console.error("Error adding document:", error);
      setNotification({ message: "Error uploading document.", type: "error" });
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
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
       
        <Notification message={notification?.message} type={notification?.type} />

        <div className="flex flex-row space-x-8 pt-4">
          <div className="bg-blue-400 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white flex flex-row items-center justify-between">
              Incoming Documents
              <FileInput />
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {incoming.length}
            </p>
          </div>
          <div className="bg-blue-500 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white flex flex-row items-center justify-between">
              Outgoing Documents
              <FileOutput />
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {outgoing.length}
            </p>
          </div>
          <div className="bg-blue-600 relative w-80 h-40 rounded-md">
            <p className="p-4 font-medium text-2xl text-white flex flex-row items-center justify-between">
              Total Documents
              <Files />
            </p>
            <p className="text-center text-white font-medium text-4xl">
              {total.length}
            </p>
          </div>
        </div>

        {/* Add New Document Form */}
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
               ref={fileInputRef}
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
