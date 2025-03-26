const Petition = require('../models/petitionModel');
const Notification = require('../models/notificationModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const petitionController = {
    createPetition: asyncHandler(async (req, res) => {
        const { title, description } = req.body;

        if (!title|| !description) {
            return res.status(400).json({ message: 'Title is required' });
        }

        try {
            const petition = await Petition.create({
                userId: req.user.id,
                userName: req.user.name,
                title,
                description,
                status: 'Pending',
            });

            res.status(201).json(petition);
        } catch (error) {
            console.error('Create Petition Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getPetitionById: asyncHandler(async (req, res) => {
        try {
            const petition = await Petition.findById(req.params.id).populate('userId', 'name email');
    
            if (!petition) {
                return res.status(404).json({ message: 'Petition not found' });
            }
    
            // Check if the logged-in user is the creator or an admin
            if (req.user.id.toString() === petition.userId._id.toString()) {
                res.json(petition);
            } else {
                return res.status(403).json({ message: 'You are not authorized to view this petition' });
            }
        } catch (error) {
            console.error('Get Petition by ID Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid petition ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
    
    getAllUserPetitions: asyncHandler(async (req, res) => {
        try {
            const petitions = await Petition.find({ userId: req.user.id }).populate('userId', 'name email');
    
            res.json(petitions);
        } catch (error) {
            console.error('Get All User Petitions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updatePetitionByUser: asyncHandler(async (req, res) => {
        try {
            const petition = await Petition.findById(req.params.id);
            if (!petition) {
                return res.status(404).json({ message: 'Petition not found' });
            }

            if (petition.userId.toString() !== req.user.id.toString()) {
                return res.status(403).json({ message: 'Not authorized to update this petition' });
            }

            const updatedPetition = await Petition.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', 'name email');
            res.json(updatedPetition);
        } catch (error) {
            console.error('Update Petition by User Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid petition ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deletePetitionByUser: asyncHandler(async (req, res) => {
        try {
            const petition = await Petition.findById(req.params.id);
            if (!petition) {
                return res.status(404).json({ message: 'Petition not found' });
            }

            if (petition.userId.toString() !== req.user.id.toString()) {
                return res.status(403).json({ message: 'Not authorized to delete this petition' });
            }

            await Petition.findByIdAndDelete(req.params.id);
            res.json({ message: 'Petition deleted successfully' });
        } catch (error) {
            console.error('Delete Petition by User Error:', error);
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid petition ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updatePetitionStatusByVicar: asyncHandler(async (req, res) => {
        const { status } = req.body;
        try {
            const petition = await Petition.findById(req.params.id);
            if (!petition) {
                return res.status(404).json({ message: 'Petition not found' });
            }

            if (req.user.role !== 'Vicar') {
                return res.status(403).json({ message: 'Not authorized to update petition status' });
            }

            const updatedPetition = await Petition.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('userId', 'name email');

            let message = `Your petition "${petition.title}" status has been updated to ${status}.`;
            if (status === 'Resolved') {
                message = `Your petition "${petition.title}" has been resolved.`;
            }
            await Notification.create({
                userId: petition.userId,
                message: message,
                type: 'petition-status-update',
            });

            res.json(updatedPetition);
        } catch (error) {
            console.error('Update Petition Status by Vicar Error:', error);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: 'Invalid petition ID' });
            }
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllPetitions: asyncHandler(async (req, res) => {
        try {
            const petitions = await Petition.find().populate('userId', 'name email');
            res.json(petitions);
        } catch (error) {
            console.error('Get All Petitions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = petitionController;