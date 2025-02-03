import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Document Tracking System</h1>

      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(username, password);
          }}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
