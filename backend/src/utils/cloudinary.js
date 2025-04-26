import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";

// Configuration
cloudinary.config({
  // process.env.CLOUDINARY_NAME
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  // process.env.CLOUDINARY_API_KEY
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  // process.env.CLOUDINARY_API_SECRET
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtils };
