import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import AdminBG from "../../assets/bg4.jpg";
import "../../App.css"

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );
      
      const token = response.data.token;
      login(token); 
      navigate("/admin/dashboard"); 
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div 
    className="h-screen flex flex-col items-center bg-cover bg-center relative" 
    style={{ backgroundImage: `url(${AdminBG})` }}
  >
    <div className="absolute inset-0 bg-blue-950 opacity-85"></div>
    <h1 className="text-white text-7xl font-bold relative z-10 top-30">
      Document Tracking System
    </h1>
  
  <div className="flex justify-center items-center h-screen">


    <div class="glassmorphism-container">
      <form onSubmit={handleLogin} className="space-y-1">
        <div>
          <label className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded-md bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded-md bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-gray-900 mt-2"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  </div>
  
  );
};

export default AdminLogin;
