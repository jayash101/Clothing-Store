import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer"

// Configuration
cloudinary.config({
  // process.env.CLOUDINARY_NAME
  cloud_name: "dnc7zafyl",
  // process.env.CLOUDINARY_API_KEY
  api_key: "596745667871512",
  // process.env.CLOUDINARY_API_SECRET
  api_secret: "83M0742rZkmxFQ36BlgWebi2cjo",
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
