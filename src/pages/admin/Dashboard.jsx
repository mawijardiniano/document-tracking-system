import React, { useState, useEffect } from "react";
import axios from "axios";
import DasboardLayout from "./dashboardLayout";
import AdminBG from "../../assets/bg2.jpg";
import "../../App.css";
import { FileInput, FileOutput, Files } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const api = "http://localhost:5000/api/document/get-document";
  const [documents, setDocuments] = useState([]);
  const [total, setTotal] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Incoming Documents",
        data: [],
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
      },
      {
        label: "Outgoing Documents",
        data: [],
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  });
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchDocument = async () => {
    try {
      const response = await axios.get(api);
      const allDocs = response.data;

      const uniqueYears = [];

      allDocs.forEach((doc) => {
        const docDate = moment(doc.date);
        const year = docDate.format("YYYY");

        if (!uniqueYears.includes(year)) {
          uniqueYears.push(year);
        }
      });

      setYears(uniqueYears);
      setDocuments(allDocs);

      const currentYear = moment().format("YYYY");
      setSelectedYear(currentYear);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const filterDocumentsByYear = () => {
    const filteredDocs = documents.filter(
      (doc) => moment(doc.date).format("YYYY") === selectedYear
    );

    const incomingDocs = filteredDocs.filter((doc) => doc.type === "incoming");
    const outgoingDocs = filteredDocs.filter((doc) => doc.type === "outgoing");

    setTotal(filteredDocs);
    setIncoming(incomingDocs);
    setOutgoing(outgoingDocs);

    const months = moment.monthsShort();
    const incomingCounts = [];
    const outgoingCounts = [];

    months.forEach((month, index) => {
      const monthDocs = filteredDocs.filter(
        (doc) => moment(doc.date).month() === index
      );

      incomingCounts.push(
        monthDocs.filter((doc) => doc.type === "incoming").length
      );
      outgoingCounts.push(
        monthDocs.filter((doc) => doc.type === "outgoing").length
      );
    });

    setChartData({
      labels: months,
      datasets: [
        {
          ...chartData.datasets[0],
          data: incomingCounts,
        },
        {
          ...chartData.datasets[1],
          data: outgoingCounts,
        },
      ],
    });
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      filterDocumentsByYear();
    }
  }, [selectedYear]);

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
        <div className="flex justify-center space-x-4 relative bg-white  self-start">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2"
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 w-1/2 relative bg-white flex self-start h-1/3">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Months",
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Document Count",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </DasboardLayout>
  );
};

export default Dashboard;
