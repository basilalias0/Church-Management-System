// donationRoutes.js
const express = require('express');
const donationRouter = express.Router();
const donationController = require('../controllers/donationController');

// Donation Routes
donationRouter.post('/', donationController.createDonation); // Create a donation
donationRouter.get('/', donationController.getAllDonations); // View all donations
donationRouter.post('/webhook', express.raw({ type: 'application/json' }), donationController.stripeWebhook); // Stripe webhook endpoint

module.exports = donationRouter;