const Donation = require('../models/donationModel');
const Transaction = require('../models/transactionModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Receipt = require('../models/receiptModel');
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const donationController = {
    createDonation: asyncHandler(async (req, res) => {
        const { name, contactNumber, amount, message, stripeToken } = req.body
        

        try {
            // Create a Stripe charge
            const charge = await stripe.charges.create({
                amount: amount * 100, // Amount in cents
                currency: 'usd', // Change to your currency
                description: 'Donation',
                source: stripeToken, // Token from Stripe.js
                metadata: { name, contactNumber, message }, // Store donation details in metadata
            });

            // Respond immediately, as donation will be handled in webhook
            res.status(201).json({ message: 'Payment processing, donation will be recorded soon' });
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

    stripeWebhook: asyncHandler(async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        console.log(req.body);
        console.log(sig);
        
        

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            console.error('Webhook Error:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the event
        if (event.type === 'charge.succeeded') {
            const charge = event.data.object;
            const { amount, description, metadata, receipt_url } = charge;
            const donationDate = new Date(charge.created * 1000); // Convert timestamp to Date

            try {
                // Extract donation details from metadata
                const { name, contactNumber, message } = metadata;

                // Create donation entry
                const donation = await Donation.create({
                    name: name || 'Anonymous', // Fallback if metadata is missing
                    contactNumber: contactNumber || '',
                    amount: amount / 100, // Convert cents to dollars
                    message: message || '',
                    donationDate,
                });

                // Create a transaction entry
                const transaction = await Transaction.create({
                    transactionDate: donationDate,
                    category: 'donation',
                    amount: amount / 100,
                    description: `Donation received via Stripe ${description}`,
                    type: 'income',
                });

                // Create a receipt entry
                const receipt = await Receipt.create({
                    receiptUrl: receipt_url,
                    transactionId: transaction._id,
                });

                res.json({ received: true, transaction, receipt, donation });
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