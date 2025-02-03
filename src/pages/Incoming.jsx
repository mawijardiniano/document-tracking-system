import { useAuth } from "../context/AuthContext";

const Incoming = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incoming Documents</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-4" onClick={logout}>
        Logout
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Date Received</th>
            <th className="border border-gray-300 p-2">Agency</th>
            <th className="border border-gray-300 p-2">Purpose</th>
            <th className="border border-gray-300 p-2">Signature/Name</th>
          </tr>
        </thead>
        <tbody>
          {/* Replace this with dynamic data later */}
          <tr>
            <td className="border border-gray-300 p-2">2024-02-02</td>
            <td className="border border-gray-300 p-2">Agency XYZ</td>
            <td className="border border-gray-300 p-2">Official Letter</td>
            <td className="border border-gray-300 p-2">John Doe</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Incoming;
