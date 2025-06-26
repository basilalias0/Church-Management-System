# 🌐 Project Setup - Environment Variables

This project requires several environment variables for proper functioning. Make sure to create a `.env` file in the root of your project and add the following variables with **your own credentials**.


## 📦 Required Environment Variables

```env
PORT=5000

# MongoDB
MONGODB_CONNECTION_STRING=your_mongodb_connection_string

# Email Configuration
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_SERVICE=gmail

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Server URL
SERVER_URL=https://your-deployment-url.com

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# (Optional) Alternate Email Auth
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
