import React, { useEffect, useState } from "react";
import axios from "axios";
import SendMessageForm from "./SendMessageForm";
import { useNavigate } from "react-router-dom";
import ReplyForm from "./ReplyForm";

const MessageList = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  let userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
        console.log(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Error fetching messages.");
      }
    };

    fetchMessages();
  }, []);  

  const handleReply = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      )
    );
  };

  return (
    <>
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
        <h2 className="text-2xl font-bold my-5 text-center">Messages</h2>
        {messages?.map((message) => (
          <div
            key={message._id}
            className="bg-white p-4 mb-4 shadow-md rounded"
          >
            <p>
              <strong>From:</strong> {message.sender.name} (
              {message.sender.email})
            </p>
            <p>
              <strong>To:</strong> {message.receiver.name} (
              {message.receiver.email})
            </p>
            <p>
              <strong>Message:</strong> {message.content}
            </p>
            <p>
              <strong>Replies:</strong>
            </p>
            <ul className="pl-4">
              {message.replies.map((reply) => (
                <li key={reply._id}>
                  <strong>{reply.sender.name}:</strong> {reply.content}
                </li>
              ))}
            </ul>
            <ReplyForm messageId={message._id} onReply={handleReply} />
          </div>
        ))}
        <h3 className="text-lg font-bold mt-6">Send a New Message</h3>
        <SendMessageForm />
      </div>
    </>
  );
};

export default MessageList;
