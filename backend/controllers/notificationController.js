// notificationController.js
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');
const asyncHandler = require('express-async-handler');
const { sendNotificationEmail } = require('../utils/nodemailer');

const notificationController = {
    sendEventNotification: asyncHandler(async (event) => {
        const verifiedUsers = await User.find({ isVerified: true });

        for (const user of verifiedUsers) {
            const mailOptions = {
                to: user.email,
                subject: `New Event: ${event.title}`,
                text: `A new event "${event.title}" has been created. Description: ${event.description}. Date: ${event.date}`,
            };

            try {
                await sendNotificationEmail(mailOptions);
                console.log(`Notification sent to ${user.email}`);
            } catch (error) {
                console.error(`Failed to send notification to ${user.email}:`, error);
            }

            try {
                await Notification.create({
                    userId: user._id,
                    message: `New Event: ${event.title}. Description: ${event.description}. Date: ${event.date}`,
                    type: 'event',
                });
                console.log(`In-app notification created for ${user.email}`);
            } catch (error) {
                console.error(`Failed to create in-app notification for ${user.email}:`, error);
            }
        }
    }),

    sendEventUpdateNotification: asyncHandler(async (event) => {
        const verifiedUsers = await User.find({ isVerified: true });

        for (const user of verifiedUsers) {
            const mailOptions = {
                to: user.email,
                subject: `Event Updated: ${event.title}`,
                text: `The event "${event.title}" has been updated. Description: ${event.description}. Date: ${event.date}`,
            };

            try {
                await sendNotificationEmail(mailOptions);
                console.log(`Update notification sent to ${user.email}`);
            } catch (error) {
                console.error(`Failed to send update notification to ${user.email}:`, error);
            }

            try {
                await Notification.create({
                    userId: user._id,
                    message: `Event Updated: ${event.title}. Description: ${event.description}. Date: ${event.date}`,
                    type: 'event-update',
                });
                console.log(`In-app update notification created for ${user.email}`);
            } catch (error) {
                console.error(`Failed to create in-app update notification for ${user.email}:`, error);
            }
        }
    }),

    sendEventRevokeNotification: asyncHandler(async (event) => {
        const verifiedUsers = await User.find({ isVerified: true });

        for (const user of verifiedUsers) {
            const mailOptions = {
                to: user.email,
                subject: `Event Revoked: ${event.title}`,
                text: `The event "${event.title}" scheduled for ${event.date} has been revoked.`,
            };

            try {
                await sendNotificationEmail(mailOptions);
                console.log(`Revoke notification sent to ${user.email}`);
            } catch (error) {
                console.error(`Failed to send revoke notification to ${user.email}:`, error);
            }

            try {
                await Notification.create({
                    userId: user._id,
                    message: `Event Revoked: ${event.title}. Date: ${event.date}`,
                    type: 'event-revoke',
                });
                console.log(`In-app revoke notification created for ${user.email}`);
            } catch (error) {
                console.error(`Failed to create in-app revoke notification for ${user.email}:`, error);
            }
        }
    }),

    getNotificationsByUser: asyncHandler(async (req, res) => {
        try {
            const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
            res.json(notifications);
        } catch (error) {
            console.error('Get Notifications by User Error:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }),
};

module.exports = notificationController;