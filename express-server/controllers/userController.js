import { User } from "../database/Models/User.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error });
    }
};

export const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error });
    }
};

export const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { name, contact, role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, contact, role }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error });
    }
};

export const deleteUserController = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.', error });
    }
};
