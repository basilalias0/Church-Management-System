const FamilyUnit = require('../models/familyUnitModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const familyUnitController = {
    createFamilyUnit: asyncHandler(async (req, res) => {
        const { name, shortCode } = req.body;

        if (!name || !shortCode) {
            return res.status(400).json({ message: 'Name and shortCode are required' });
        }

        try {
            const familyUnitExists = await FamilyUnit.findOne({ shortCode });
            if (familyUnitExists) {
                return res.status(400).json({ message: 'Family unit with this short code already exists' });
            }

            const familyUnit = await FamilyUnit.create({
                name,
                shortCode,
            });

            res.status(201).json(familyUnit);
        } catch (error) {
            console.error('Create Family Unit Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getFamilyUnitById: asyncHandler(async (req, res) => {
        try {
            const familyUnit = await FamilyUnit.findById(req.params.id);

            if (!familyUnit) {
                return res.status(404).json({ message: 'Family unit not found' });
            }

            res.json(familyUnit);
        } catch (error) {
            console.error('Get Family Unit by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family unit ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateFamilyUnit: asyncHandler(async (req, res) => {
        try {
            const familyUnit = await FamilyUnit.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

            if (!familyUnit) {
                return res.status(404).json({ message: 'Family unit not found' });
            }

            res.json(familyUnit);
        } catch (error) {
            console.error('Update Family Unit Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family unit ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    

    deleteFamilyUnit: asyncHandler(async (req, res) => {
        try {
            const familyUnit = await FamilyUnit.findByIdAndDelete(req.params.id);

            if (!familyUnit) {
                return res.status(404).json({ message: 'Family unit not found' });
            }

            res.json({ message: 'Family unit deleted successfully' });
        } catch (error) {
            console.error('Delete Family Unit Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family unit ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllFamilyUnits: asyncHandler(async (req, res) => {
        try {
            const familyUnits = await FamilyUnit.find();
            res.json(familyUnits);
        } catch (error) {
            console.error('Get All Family Units Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    getUsersInFamilyUnit: asyncHandler(async (req, res) => {
        try {
            const familyUnitId = req.params.id;

            // Find the family unit by ID
            const familyUnit = await FamilyUnit.findById(familyUnitId);

            if (!familyUnit) {
                return res.status(404).json({ message: 'Family unit not found' });
            }

            // Find all users with the matching familyUnitCode
            const users = await User.find({ familyUnitCode: familyUnit.shortCode });

            res.json(users);
        } catch (error) {
            console.error('Get Users in Family Unit Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family unit ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = familyUnitController;