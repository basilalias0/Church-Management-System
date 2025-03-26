const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const parishMemberController = {
    addParishMember: asyncHandler(async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            // Check if the user is verified
            if (!req.user.isVerified) {
                return res.status(403).json({ message: 'Only verified users can add parish members' });
            }

            // Check if the user to be added is verified
            const userToAdd = await User.findById(userId);

            if (!userToAdd){
                return res.status(404).json({message: "User not found"})
            }

            if (!userToAdd.isVerified) {
                return res.status(403).json({ message: 'The user to be added must be verified' });
            }

            // Check if the user is already a parish member
            if (req.user.id.toString() === userId.toString()) {
                return res.status(400).json({ message: 'You cannot add yourself' });
            }

            const existingParishMember = await User.findOne({ _id: userId, isParishMember: true });
            if (existingParishMember) {
                return res.status(400).json({ message: 'User is already a parish member' });
            }

            // Update the user to be a parish member
            await User.findByIdAndUpdate(userId, { isParishMember: true });

            res.status(200).json({ message: 'User added as parish member successfully' });
        } catch (error) {
            console.error('Add Parish Member Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    removeParishMember: asyncHandler(async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            // Check if the user is verified
            if (!req.user.isVerified) {
                return res.status(403).json({ message: 'Only verified users can remove parish members' });
            }

            // Check if the user is a parish member
            const userToRemove = await User.findById(userId);

             if (!userToRemove){
                return res.status(404).json({message: "User not found"})
            }

            if (!userToRemove.isParishMember) {
                return res.status(400).json({ message: 'User is not a parish member' });
            }

            // Update the user to not be a parish member
            await User.findByIdAndUpdate(userId, { isParishMember: false });

            res.status(200).json({ message: 'User removed from parish members successfully' });
        } catch (error) {
            console.error('Remove Parish Member Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    
    toggleParishMemberByAdmin: asyncHandler(async (req, res) => {
        const { userId, isParishMember } = req.body;

        if (!userId || isParishMember === undefined) {
            return res.status(400).json({ message: 'User ID and isParishMember are required' });
        }

        try {
            // Check if the logged-in user is an admin
            if (req.user.role !== 'Admin') {
                return res.status(403).json({ message: 'Only admins can toggle parish member status' });
            }

            // Update the user's isParishMember field
            await User.findByIdAndUpdate(userId, { isParishMember });

            res.status(200).json({ message: `User's parish member status updated successfully` });
        } catch (error) {
            console.error('Toggle Parish Member by Admin Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getParishMembers: asyncHandler(async (req, res) => {
        try {
            const parishMembers = await User.find({ isParishMember: true });
            res.json(parishMembers);
        } catch (error) {
            console.error('Get Parish Members Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = parishMemberController;