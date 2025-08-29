import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../utils/categories";

export default function ProfilePage({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Interests</h3>
            <ul>
              {user.categories.map((catId) => {
                const category = categories.find(cat => cat.id === catId)?.label || "Unknown";
                return (
                  <li key={catId} className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                    {category}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
