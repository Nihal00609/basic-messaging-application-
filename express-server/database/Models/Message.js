import { Schema, model } from 'mongoose';

const replySchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

export const Message = model('Message', MessageSchema);
