import React, { useState } from "react";
import axios from "axios";

const ReplyForm = ({ messageId, onReply }) => {
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/${messageId}/reply`,
        { content: replyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReply(res.data); 
      setReplyContent("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error replying to the message.");
    }
  };

  return (
    <div>
      {activeMessageId === messageId ? (
        <div className="mt-2">
          <textarea
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={() => handleReply()}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Send Reply
          </button>
          <button
            onClick={() => setActiveMessageId(null)}
            className="bg-gray-500 text-white py-2 px-4 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setActiveMessageId(messageId)}
          className="bg-green-500 text-white py-2 px-4 rounded mt-2"
        >
          Reply
        </button>
      )}
    </div>
  );
};

export default ReplyForm;
