// eventController.js
const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');
const notificationController = require('./notificationController');

const eventController = {
    createEvent: asyncHandler(async (req, res) => {
        const { title, description, date } = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({ message: 'Title, description, and date are required' });
        }

        try {
            const event = await Event.create({ title, description, date });

            await notificationController.sendEventNotification(event);

            res.status(201).json(event);
        } catch (error) {
            console.error('Create Event Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getEventById: asyncHandler(async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        } catch (error) {
            console.error('Get Event by ID Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    updateEvent: asyncHandler(async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

            await notificationController.sendEventUpdateNotification(updatedEvent);

            res.json(updatedEvent);
        } catch (error) {
            console.error('Update Event Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    deleteEvent: asyncHandler(async (req, res) => {
        try {
            const event = await Event.findByIdAndDelete(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            await notificationController.sendEventRevokeNotification(event);

            res.json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error('Delete Event Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllEvents: asyncHandler(async (req, res) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            console.error('Get All Events Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = eventController;