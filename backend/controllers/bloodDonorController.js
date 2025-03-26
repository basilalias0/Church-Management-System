const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const bloodDonorController = {
    createBloodDonor: asyncHandler(async (req, res) => {
        const { bloodType, contactNumber } = req.body;

        if (!bloodType || !contactNumber) {
            return res.status(400).json({ message: 'Blood type and contact number are required' });
        }

        try {
            await User.findByIdAndUpdate(req.user.id, {
                isBloodDonor: true,
                bloodType,
                contactNumber,
            });

            res.status(200).json({ message: 'User added as blood donor successfully' });
        } catch (error) {
            console.error('Create Blood Donor Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateBloodDonor: asyncHandler(async (req, res) => {
        const { bloodType, contactNumber } = req.body;

        try {
            const updateFields = {};
            if (bloodType) updateFields.bloodType = bloodType;
            if (contactNumber) updateFields.contactNumber = contactNumber;

            await User.findByIdAndUpdate(req.user.id, updateFields);

            res.status(200).json({ message: 'Blood donor details updated successfully' });
        } catch (error) {
            console.error('Update Blood Donor Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteBloodDonor: asyncHandler(async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                isBloodDonor: false,
                bloodType: null,
                contactNumber: null,
            });

            res.status(200).json({ message: 'Blood donor details deleted successfully' });
        } catch (error) {
            console.error('Delete Blood Donor Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    toggleBloodDonor: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await User.findByIdAndUpdate(req.user.id, {
                isBloodDonor: !user.isBloodDonor,
            });

            res.status(200).json({ message: 'User blood donor status toggled successfully', isBloodDonor:!user.isBloodDonor });
        } catch (error) {
            console.error('Toggle Blood Donor Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getBloodDonors: asyncHandler(async (req, res) => {
        const { bloodType, name } = req.query;

        try {
            let query = { isBloodDonor: true };

            if (bloodType) {
                query.bloodType = bloodType;
            }

            if (name) {
                query.name = { $regex: name, $options: 'i' };
            }

            const bloodDonors = await User.find(query);
            res.json(bloodDonors);
        } catch (error) {
            console.error('Get/Search Blood Donors Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = bloodDonorController;