// eventRoutes.js
const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controllers/eventController'); // Adjust the path
const { protect, authorize } = require('../middleware/authMiddleware'); // Adjust the path

eventRouter.post('/', protect, authorize("Vicar"), eventController.createEvent);
eventRouter.get('/:id', protect, eventController.getEventById);
eventRouter.put('/:id', protect,authorize("Vicar"), eventController.updateEvent);
eventRouter.delete('/:id', protect, authorize("Vicar"), eventController.deleteEvent);
eventRouter.get('/', protect, eventController.getAllEvents); // Get all events

module.exports = eventRouter;