import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact: Number,
        role: { type: String, enum: ['Teacher', 'Student', 'Institute'], required: true },
        password: { type: String, required: true },
        status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    },
    { timestamps: true }
);

export const User = model('User', UserSchema);
