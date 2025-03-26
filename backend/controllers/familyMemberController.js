const FamilyMember = require('../models/familyMemberModel');
const FamilyUnit = require('../models/familyUnitModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const familyMemberController = {
    addFamilyMember: asyncHandler(async (req, res) => {
        const { name, relation, dateOfBirth, contactNumber } = req.body;
        const {familyUnitCode} = req.user

        if (!name || !relation ) {
            return res.status(400).json({ message: 'Name, relation required' });
        }

        try {
            // Check if the user is verified
            if (!req.user.isParishMember) {
                return res.status(403).json({ message: 'Only verified users can add family members' });
            }

            if (!req.user.uniqueFamilyCode) {
                return res.status(404).json({ message: "User didn't added family" });
            }
            

            // Create the family member
            const familyMember = await FamilyMember.create({
                creatorId: req.user.id,
                name,
                relation,
                dateOfBirth,
                contactNumber,
                familyUnitCode,
                uniqueFamilyCode:req.user.uniqueFamilyCode,
            });

            res.status(201).json(familyMember);
        } catch (error) {
            console.error('Add Family Member Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getFamilyMemberById: asyncHandler(async (req, res) => {
        try {
            const familyMember = await FamilyMember.findById(req.params.id).populate('userId', 'name email');

            if (!familyMember) {
                return res.status(404).json({ message: 'Family member not found' });
            }

            res.json(familyMember);
        } catch (error) {
            console.error('Get Family Member by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateFamilyMember: asyncHandler(async (req, res) => {
        try {
            const familyMember = await FamilyMember.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            }).populate('userId', 'name email');

            if (!familyMember) {
                return res.status(404).json({ message: 'Family member not found' });
            }

            res.json(familyMember);
        } catch (error) {
            console.error('Update Family Member Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteFamilyMember: asyncHandler(async (req, res) => {
        try {
            const familyMember = await FamilyMember.findByIdAndDelete(req.params.id);

            if (!familyMember) {
                return res.status(404).json({ message: 'Family member not found' });
            }

            res.json({ message: 'Family member deleted successfully' });
        } catch (error) {
            console.error('Delete Family Member Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid family member ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllFamilyMembers: asyncHandler(async (req, res) => {
        try {
            const familyMembers = await FamilyMember.find().populate('creatorId', 'name email');
            res.json(familyMembers);
        } catch (error) {
            console.error('Get All Family Members Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getFamilyMembersByUser: asyncHandler(async (req, res) => {
        try {
            const familyMembers = await FamilyMember.find({ creatorId: req.user.id }).populate('creatorId', 'name email');
            res.json(familyMembers);
        } catch (error) {
            console.error('Get Family Members by User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = familyMemberController;