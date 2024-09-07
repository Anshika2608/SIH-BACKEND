const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables from .env file
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.API_KEY);
console.log('API Secret:', process.env.API_SECRET);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = cloudinary;
