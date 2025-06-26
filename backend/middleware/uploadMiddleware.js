    const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const multer = require('multer');
    require('dotenv').config();

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });

    const upload = (folder) => {
        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: folder,
                resource_type: 'auto',
                allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'mov', 'avi']
            },
        });

        return multer({ storage: storage });
    };

    module.exports = upload;