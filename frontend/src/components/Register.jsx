import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      contact: "",
      role: "Student",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
        alert("User registered successfully.");
        navigate("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed.");
      }
    };
  
    return (
      <>
      <div className="max-w-md mx-auto px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register</h2>
        <form onSubmit={handleSubmit} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-md p-4 shadow-lg space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="contact"
            placeholder="Mobile Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Institute">Institute</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Sign In
          </button>
          Already have an account? <Link to="/login" className="text-cyan-500">Login</Link>
        </form>
      </div>
      </>
    );
  };
  
  export default RegistrationForm;