import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './../database/Models/User.js';

export const registerController = async (req, res) => {
    const { name, email, contact, role, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, contact, role, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully. Please log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error });
    }
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user, message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error });
    }
};

