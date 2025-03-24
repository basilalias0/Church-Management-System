const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const bloodDonorController = {
    createBloodDonor: asyncHandler(async (req, res) => {
        const {bloodType, contactNumber } = req.body;

        if ( !bloodType || !contactNumber) {
            return res.status(400).json({ message: 'Please provide blood type, and contact number' });
        }
        console.log(req.user);
        

        try {
            const userFound = await User.findById(req.user.id);

            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!userFound.isVerified) {
                return res.status(403).json({ message: 'Only verified users can create blood donor status' });
            }
            const user = await User.findByIdAndUpdate(req.user.id, {
                bloodType,
                contactNumber,
                isBloodDonor: true,
            }, { new: true }).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(201).json(user);
        } catch (error) {
            console.error('Create Blood Donor Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getBloodDonorById: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');

            if (!user || !user.isBloodDonor) {
                return res.status(404).json({ message: 'Blood donor not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Get Blood Donor by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllBloodDonors: asyncHandler(async (req, res) => {
        try {
            const bloodDonors = await User.find({ isBloodDonor: true }).select('-password');
            res.json(bloodDonors);
        } catch (error) {
            console.error('Get All Blood Donors Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    markBloodDonorAsFalse: asyncHandler(async (req, res) => {
        
        try {
            const userFound = await User.findById(req.user.id);

            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!userFound.isVerified) {
                return res.status(403).json({ message: 'Only verified users can create blood donor status' });
            }
            const user = await User.findByIdAndUpdate(req.user.id, { isBloodDonor: false }, { new: true }).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'Blood donor status marked as false' });
        } catch (error) {
            console.error('Mark Blood Donor as False Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateBloodDonorDetails: asyncHandler(async (req, res) => {
        const { bloodType, contactNumber } = req.body;

        if (!bloodType || !contactNumber) {
            return res.status(400).json({ message: 'Please provide blood type and contact number' });
        }

        try {
            const userFound = await User.findById(req.user.id);
            
            if (!userFound.isBloodDonor) {
                return res.status(403).json({ message: 'Only blood donors can update their details'
                    })
                }
            const user = await User.findByIdAndUpdate(req.user.id, { bloodType, contactNumber }, { new: true }).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Update Blood Donor Details Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    searchBloodDonors: asyncHandler(async (req, res) => {
        try {
            const { search, bloodType } = req.query;
            console.log(req.query);
            
            let query = { isBloodDonor: true };

            if (search) {
                query.fullName = { $regex: search, $options: 'i' };
            }

            if (bloodType) {
                query.bloodType = bloodType;
            }

            const bloodDonors = await User.find(query).select('-password');
            res.json(bloodDonors);
        } catch (error) {
            console.error('Search Blood Donors Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = bloodDonorController;