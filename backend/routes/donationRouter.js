// donationRoutes.js
const express = require('express');
const donationRouter = express.Router();
const app = express()
const donationController = require('../controllers/donationController');

donationRouter.post('/webhook', express.raw({ type: 'application/json' }), donationController.stripeWebhook); // Stripe webhook endpoint

app.use(express.json())
// Donation Routes
donationRouter.post('/', donationController.createDonation); // Create a donation
donationRouter.get('/', donationController.getAllDonations); // View all donations


module.exports = donationRouter;