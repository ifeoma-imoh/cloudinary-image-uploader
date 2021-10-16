
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.handler = async event => {
  const file = event.body;
  const res = await cloudinary.uploader.upload(file, {
    image_metadata: true,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };
};