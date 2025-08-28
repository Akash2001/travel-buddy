import React from "react";

export default function ProfilePage({ user }) {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar || ""}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Location</h3>
            <p className="text-gray-800">{user.location || "Not set"}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Joined</h3>
            <p className="text-gray-800">{user.joined || "Unknown"}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Bio</h3>
            <p className="text-gray-800">{user.bio || "No bio provided"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
