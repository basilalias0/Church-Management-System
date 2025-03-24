// petitionController.js
const Petition = require('../models/petitionModel');
const Notification = require('../models/notificationModel'); // Assuming you have a Notification model
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const petitionController = {
    createPetition: asyncHandler(async (req, res) => {
        const { category, title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        try {
            const petition = await Petition.create({
                userId: req.user.id,
                category,
                title,
                description,
                status: 'Pending',
            });

            res.status(201).json(petition);
        } catch (error) {
            console.error('Create Petition Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getPetitionById: asyncHandler(async (req, res) => {
        try {
            const petition = await Petition.findById(req.params.id).populate('userId', 'username email');
            if (!petition) {
                return res.status(404).json({ message: 'Petition not found' });
            }
            res.json(petition);
        } catch (error) {
            console.error('Get Petition by ID Error:', error);
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

            const updatedPetition = await Petition.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId', 'username email');
            res.json(updatedPetition);
        } catch (error) {
            console.error('Update Petition by User Error:', error);
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

            if (req.user.role !== 'vicar') {
                return res.status(403).json({ message: 'Not authorized to update petition status' });
            }

            const updatedPetition = await Petition.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('userId', 'username email');

            if (status === 'Resolved') {
                await Notification.create({
                    userId: petition.userId,
                    message: `Your petition "${petition.title}" has been resolved.`,
                    type: 'petition-resolved',
                });
            }

            res.json(updatedPetition);
        } catch (error) {
            console.error('Update Petition Status by Vicar Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllPetitions: asyncHandler(async (req, res) => {
        try {
            const petitions = await Petition.find().populate('userId', 'username email');
            res.json(petitions);
        } catch (error) {
            console.error('Get All Petitions Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = petitionController;