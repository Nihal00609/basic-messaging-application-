import { Message } from "./../database/Models/Message.js";

export const sendMessageController = async (req, res) => {
  const { receiver, content } = req.body;
  const sender = req.user.id;
  if (!receiver || !content) {
    return res
      .status(400)
      .json({ message: "Receiver and content are required." });
  }

  try {
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error sending message.", error });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("replies.sender", "name email")
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages!!", error });
  }
};

export const replyMessageController = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;
  const sender = req.user.id;

  if (!content) {
    return res.status(400).json({ message: "Reply content is required." });
  }

  try {
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ message: "Original message not found." });
    }

    originalMessage.replies.push({ sender, content });
    await originalMessage.save();

    const updatedMessage = await Message.findById(messageId).populate([
      { path: "sender", select: "name email" },
      { path: "receiver", select: "name email" },
      { path: "replies.sender", select: "name email" },
    ]);
    res.status(201).json(updatedMessage);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error replying to message.", error });
  }
};
