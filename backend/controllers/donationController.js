const Donation = require('../models/donationModel');
const Transaction = require('../models/transactionModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

const donationController = {
    createDonation: asyncHandler(async (req, res) => {
        const { name, contactNumber, amount, message } = req.body;
        
        try {
            // Create a Stripe charge
            const charge = await stripe.charges.create({
                amount: amount * 100, // Amount in cents
                currency: 'usd', // Change to your currency
                description: 'Donation',
                source: req.body.stripeToken, // Token from Stripe.js
            });

            // If charge is successful, save donation to database
            if (charge.status === 'succeeded') {
                const donation = await Donation.create({
                    name,
                    contactNumber,
                    amount,
                    message,
                    donationDate: new Date(), // Automatically entered
                });

                res.status(201).json(donation);
            } else {
                res.status(400).json({ message: 'Payment failed' });
            }
        } catch (error) {
            console.error('Create Donation Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    getAllDonations: asyncHandler(async (req, res) => {
        try {
            const donations = await Donation.find();
            res.json(donations);
        } catch (error) {
            console.error('Get All Donations Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),

    // Stripe Webhook (Handle successful payments)
    stripeWebhook: asyncHandler(async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        console.log("event",event);
        

        // Handle the event
        if (event.type === 'charge.succeeded') {
            // Handle successful charge
            const charge = event.data.object;
            const { amount, description } = charge;
            const donationDate = new Date(charge.created * 1000); // Convert timestamp to Date

            try {

                // Create a transaction entry
                const transaction = await Transaction.create({
                    transactionDate: donationDate,
                    category: 'donation',
                    amount: amount / 100,
                    description: `Donation received via Stripe`,
                    type: 'income',
                });

                res.json({ received: true, transaction });
            } catch (dbError) {
                console.error('Database Error:', dbError);
                res.status(500).json({ message: 'Database error processing webhook' });
            }
        } else {
            res.json({ received: true }); // Acknowledge other events
        }
    }),
};

module.exports = donationController;