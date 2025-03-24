const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const virtualIdCardController = {
    getVirtualIdCard: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select(
                'fullName profilePicture dateOfBirth contactNumber address bloodType isVerified role'
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.dateOfBirth) {
                return res.status(400).json({ message: 'Please add your date of birth to your profile.' });
            }

            const birthDate = new Date(user.dateOfBirth);
            const currentDate = new Date();
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18 || age > 40) {
                return res.status(403).json({ message: 'Virtual ID cards are only available for users aged 18 to 40.' });
            }

            // You can add more logic here to customize the virtual ID card data
            const virtualIdCardData = {
                fullName: user.fullName,
                profilePicture: user.profilePicture,
                dateOfBirth: user.dateOfBirth,
                contactNumber: user.contactNumber,
                address: user.address,
                bloodType: user.bloodType,
                isVerified: user.isVerified,
                role: user.role,
                // Add any other relevant user details
            };

            res.json(virtualIdCardData);
        } catch (error) {
            console.error('Get Virtual ID Card Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = virtualIdCardController;