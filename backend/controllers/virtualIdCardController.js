const User = require('../models/userModel');
const VirtualIDCard = require('../models/virtualIDCardModel'); // Import the VirtualIDCard model
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const virtualIdCardController = {
    getVirtualIdCard: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

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

            // Check if a virtual ID card already exists for the user
            let virtualIdCard = await VirtualIDCard.findOne({ userId: req.user.id });

            if (!virtualIdCard) {
                // Generate a unique ID (starting from 1000 and incrementing)
                const lastCard = await VirtualIDCard.findOne({}, {}, { sort: { 'uniqueID': -1 } });
                const nextUniqueID = lastCard ? lastCard.uniqueID + 1 : 1000;

                // Create a new virtual ID card
                virtualIdCard = await VirtualIDCard.create({
                    userId: req.user.id,
                    age: age,
                    uniqueID: nextUniqueID,
                    photo: user.profilePicture, // Assuming profilePicture is the photo
                    contactNumber: user.contactNumber,
                });
            }

            // Return the virtual ID card data
            res.json({
                fullName: user.name, // Use name from user model
                age: virtualIdCard.age,
                uniqueID: virtualIdCard.uniqueID,
                photo: virtualIdCard.photo,
                contactNumber: virtualIdCard.contactNumber,
                dateOfBirth: user.dateOfBirth,
                address: user.address,
                bloodType: user.bloodType,
                isVerified: user.isVerified,
                role: user.role,
            });
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