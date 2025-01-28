import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching users.");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user.");
    }
  };

  let userDetails = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end pt-5">
        <span className="text-gray-700 font-medium py-1 px-3">
          Welcome {userDetails.name} ({userDetails.role})
        </span>
        <button
          className="bg-white text-gray-700 font-medium py-1 px-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-bold my-5 text-center">User Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.contact}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 space-x-8 text-center">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>

                <button className="bg-indigo-500 text-white px-3 py-1 rounded">
                  <Link to={`/edit-user/${user._id}`}>Edit</Link>
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  <Link to={`/messages`}>Message</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
