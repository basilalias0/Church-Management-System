const ParishMember = require('../models/parishMemberModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const parishMemberController = {
    createParishMember: asyncHandler(async (req, res) => {
        const { userId, username, email, password } = req.body; // Include username, email, password
    
        if (!userId && (!username || !email || !password)) {
            return res.status(400).json({ message: 'Please provide user ID or username, email, and password' });
        }
    
        try {
            let user;
    
            if (userId) {
                // Existing user
                user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                // Check if logged-in user is admin or user to be added is verified
                if (req.user.role !== 'Admin' && !user.isVerified) {
                    return res.status(403).json({ message: 'Not authorized to create parish members' });
                }
            } else {
                // New user (admin adding)
                if (req.user.role !== 'Admin') {
                    return res.status(403).json({ message: 'Not authorized to create new parish members' });
                }
    
                // Check if user with same email exists
                const userExists = await User.findOne({ email });
                if (userExists) {
                    return res.status(400).json({ message: 'User with this email already exists' });
                }
    
                user = await User.create({
                    username,
                    email,
                    password,
                    isVerified: true, // Auto-verify admin-created users
                });
            }
    
            const parishMemberExists = await ParishMember.findOne({ userId: user._id });
            if (parishMemberExists) {
                return res.status(400).json({ message: 'User is already a parish member' });
            }
    
            const parishMember = await ParishMember.create({ userId: user._id, role: "Churchgoer" });
    
            res.status(201).json(parishMember);
        } catch (error) {
            console.error('Create Parish Member Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getParishMemberById: asyncHandler(async (req, res) => {
        try {
            const parishMember = await ParishMember.findById(req.params.id).populate('userId', '-password');

            if (!parishMember) {
                return res.status(404).json({ message: 'Parish member not found' });
            }

            res.json(parishMember);
        } catch (error) {
            console.error('Get Parish Member by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid parish member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateParishMember: asyncHandler(async (req, res) => {
        try {
            const parishMember = await ParishMember.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            }).populate('userId', '-password');

            if (!parishMember) {
                return res.status(404).json({ message: 'Parish member not found' });
            }

            res.json(parishMember);
        } catch (error) {
            console.error('Update Parish Member Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid parish member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteParishMember: asyncHandler(async (req, res) => {
        try {
            const parishMember = await ParishMember.findByIdAndDelete(req.params.id);

            if (!parishMember) {
                return res.status(404).json({ message: 'Parish member not found' });
            }

            res.json({ message: 'Parish member deleted successfully' });
        } catch (error) {
            console.error('Delete Parish Member Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid parish member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    searchParishMembers: asyncHandler(async (req, res) => {
        try {
            const { search } = req.query;
            let query = {};

            if (search) {
                query = {
                    'userId.fullName': { $regex: search, $options: 'i' },
                };
            }

            const parishMembers = await ParishMember.find(query).populate('userId', '-password');
            res.json(parishMembers);
        } catch (error) {
            console.error('Search Parish Members Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllParishMembers: asyncHandler(async (req, res) => {
        try {
            const parishMembers = await ParishMember.find().populate('userId', '-password');
            res.json(parishMembers);
        } catch (error) {
            console.error('Get All Parish Members Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = parishMemberController;