import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SendMessageForm = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/send`,
        { receiver, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || 'Message sent.');
      setContent('');
      setReceiver('');
      window.location.reload()
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending message.');
    }
  };

  return (
    <div className="bg-white p-4 mt-4 shadow-md rounded">
      <select
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select Receiver</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      ></textarea>
      <button
        onClick={() => handleSend()}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        Send Message
      </button>
    </div>
  );
};

export default SendMessageForm;
