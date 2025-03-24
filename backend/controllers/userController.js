const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const validator = require('validator');
const { default: mongoose } = require('mongoose');

const userController = {
    registerUser: asyncHandler(async (req, res) => {
        const { fullName, email, password, role, dateOfBirth, contactNumber, address, bloodType, photo } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).json({ message: 'Please provide all required fields' });
            return;
        }

        if (!validator.isEmail(email)) {
            res.status(400).json({ message: 'Invalid email format' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long' });
            return;
        }

        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                fullName,
                email,
                password: hashedPassword,
                role,
                dateOfBirth,
                contactNumber,
                address,
                bloodType,
                photo,
                isVerified: req.user && req.user.role === 'Admin', // Auto-verify if logged-in user is admin
            });

            if (user) {
                if (req.user && req.user.role === 'Admin') {
                    // Automatically add as parish member if logged-in user is admin
                    await ParishMember.create({ userId: user._id });
                }

                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user),
                });
            } else {
                res.status(500).json({ message: 'Failed to create user' });
            }
        } catch (error) {
            console.error('User Registration Error:', error);
            res.status(500).json({ message: 'Internal server error during registration', error: error.message });
        }
    }),

    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Please provide email and password' });
            return;
        }

        try {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user),
                });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('User Login Error:', error);
            res.status(500).json({ message: 'Internal server error during login', error: error.message });
        }
    }),

    getUserById: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Get User by ID Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    getAllUsers: asyncHandler(async (req, res) => {
        try {
            const { search } = req.query;
            let query = {};

            if (search) {
                query = {
                    fullName: { $regex: search, $options: 'i' }, // Case-insensitive search
                };
            }

            const users = await User.find(query).select('-password');
            res.json(users);
        } catch (error) {
            console.error('Get All Users Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    addAdmin: asyncHandler(async (req, res) => {
        const { fullName, email, password, dateOfBirth, contactNumber, address, bloodType, photo } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                fullName,
                email,
                password: hashedPassword,
                role: 'Admin', // Set the role to Admin
                dateOfBirth,
                contactNumber,
                address,
                bloodType,
                photo,
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    message: 'Admin user created successfully',
                });
            } else {
                res.status(500).json({ message: 'Failed to create admin user' });
            }
        } catch (error) {
            console.error('Add Admin User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateUser: asyncHandler(async (req, res) => {
        try {
            let updateData = req.body;
            if (req.file) {
                updateData = { ...req.body, photo: req.file.path };
            }

            const user = await User.findByIdAndUpdate(req.params.id, updateData, {
                new: true,
                runValidators: true,
            }).select('-password');

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Update User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteUser: asyncHandler(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (user) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Delete User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    addFamilyMember: asyncHandler(async (req, res) => {
        const { userId, relation } = req.body;
        const { id: currentUserId } = req.params; // Get the user id from the request parameters.

        if (!userId || !relation) {
            return res.status(400).json({ message: 'Please provide user ID and relation' });
        }

        try {
            const user = await User.findById(currentUserId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if userId is already in the familyMembers array
            const existingMember = user.familyMembers.find(
                (member) => member.userId.toString() === userId
            );

            if (existingMember) {
                return res.status(400).json({ message: 'Family member already added' });
            }

            // Check if the family member exists.
            const familyMemberExists = await User.findById(userId);

            if (!familyMemberExists) {
                return res.status(404).json({ message: 'Family member user ID not found' });
            }

            user.familyMembers.push({ userId, relation });
            await user.save();

            res.json({ message: 'Family member added successfully' });
        } catch (error) {
            console.error('Add Family Member Error:', error);

            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user or family member ID' });
            }

            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    verifyUser: asyncHandler(async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
            if (user) {
                res.json({ message: 'User verified successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Verify User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    // ... other user-related functionalities
};

module.exports = userController;