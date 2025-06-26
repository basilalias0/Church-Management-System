const User = require('../models/userModel');
const FamilyMember = require('../models/familyMemberModel'); // Import FamilyMember model
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const validator = require('validator');
const { default: mongoose } = require('mongoose');

const userController = {
    registerUser: asyncHandler(async (req, res) => {
        const { name, email, password, role, contactNumber, } = req.body; // Use 'name'

        if (!name || !email || !password) { // Use 'name'
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
                name, // Use 'name'
                email,
                password: hashedPassword,
                role,
                contactNumber,
                isParishMember: req.user && req.user.role === 'Admin', // Auto-verify if logged-in user is admin
            });

            if (user) {
                const userForToken = await User.findById(user._id).select('-password');

                res.status(201).json({
                    _id: user._id,
                    name: user.name, // Use 'name'
                    email: user.email,
                    role: user.role,
                    token: generateToken(userForToken),
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
            const user = await User.findOne({ email })
            const userForToken = await User.findOne({ email }).select('-password')

            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name, 
                    email: user.email,
                    role: user.role,
                    token: generateToken(userForToken),
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
    getUnverifiedUsers: asyncHandler(async (req, res) => {
        try {
          const { search } = req.query;
          let query = { isParishMember: false,role:'Normal User' }; // Filter for unverified users
    
          if (search) {
            query.name = { $regex: search, $options: 'i' }; // Optional search by name
          }
    
          const users = await User.find(query).select('-password');
          res.json(users);
        } catch (error) {
          console.error('Get Unverified Users Error:', error);
          res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      }),
      

    getAllUsers: asyncHandler(async (req, res) => {
        try {
            const { search } = req.query;
            let query = {};

            if (search) {
                query = {
                    name: { $regex: search, $options: 'i' }, // Use 'name'
                };
            }

            const users = await User.find(query).select('-password');
            res.json(users);
        } catch (error) {
            console.error('Get All Users Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateUser: asyncHandler(async (req, res) => {
        try {
            let updateData = req.body;
            if (req.file) {
                updateData = { ...req.body, profilePicture: req.file.path };
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

    addFamily: asyncHandler(async (req, res) => {
        const { occupation, dateOfBirth, contactNumber, familyUnitCode, uniqueFamilyCode } = req.body;
        const currentUserId = req.user.id; 

        if (!familyUnitCode || !uniqueFamilyCode) {
            return res.status(400).json({ message: 'Please provide name, relation, familyUnitCode, and uniqueFamilyCode' });
        }

        try {
            const user = await User.findById(currentUserId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the current user already has a family unit code
            if (user.familyUnitCode && user.uniqueFamilyCode) {
                return res.status(400).json({ message: 'User already has a family unit code' });
            }

            // Check if the provided familyUnitCode and uniqueFamilyCode already exist for another user
            const existingFamily = await FamilyMember.findOne({ familyUnitCode, uniqueFamilyCode });
            if (existingFamily) {
                return res.status(400).json({ message: 'Family unit code already exists' });
            }

            // Update the user's family unit code
            await User.findByIdAndUpdate(currentUserId, { familyUnitCode, uniqueFamilyCode });

            // Create a new family member
            const familyMember = await FamilyMember.create({
                userId: currentUserId,
                name:req.user.name,
                relation:"self",
                occupation,
                dateOfBirth,
                contactNumber:contactNumber || req.user.contactNumber,
                familyUnitCode,
                uniqueFamilyCode,
            });

            res.status(201).json({ message: 'Family member added successfully', familyMember });
        } catch (error) {
            console.error('Add Family Member Error:', error);

            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }

            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    verifyUser: asyncHandler(async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { isParishMember: true }, { new: true });
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
    
    updateUserProfile: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { dateOfBirth, contactNumber } = req.body;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            user.dateOfBirth = dateOfBirth || user.dateOfBirth;
            user.contactNumber = contactNumber || user.contactNumber;
    
            const updatedUser = await user.save();
    
            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    contactNumber: updatedUser.contactNumber,
                    dateOfBirth: updatedUser.dateOfBirth,
                },
            });
        } catch (error) {
            console.error('Update Profile Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    
};

module.exports = userController;