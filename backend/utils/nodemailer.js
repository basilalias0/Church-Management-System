// utils/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Nodemailer transporter setup (replace with your email service details)
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendNotificationEmail = async (mailOptions) => {
    try {
        mailOptions.from = process.env.EMAIL_USERNAME; // Add from address here.
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info; // Return the info object for further processing if needed
    } catch (error) {
        console.error('Nodemailer Error:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

module.exports = { sendNotificationEmail };