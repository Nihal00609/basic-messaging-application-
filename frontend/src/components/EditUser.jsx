import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(res.data.name);
      setEmail(res.data.email);
      setContact(res.data.contact);
      setRole(res.data.role);
    };
    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        { name, contact, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User updated successfully.");
      navigate("/users");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating post.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Edit User Details
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4 rounded-md p-4 shadow-lg">
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Email
          </label>
          <input
            placeholder="Email"
            value={email}
            disabled
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Phone Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Role
          </label>
          <select
            name="role"
            value={role}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Institute">Institute</option>
          </select>
        </div>
        <button
          onClick={handleEdit}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUser;
