const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer-Storage-Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith("image/")) {
      return {
        folder: "BOUTIQUE", // Folder for images
        resource_type: "image", // Ensure it's stored as an image
      };
    } else if (file.mimetype.startsWith("video/")) {
      return {
        folder: "BOUTIQUE", // Folder for reels
        resource_type: "video", // Ensure it's stored as a video
      };
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};

const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB (50 * 1024 bytes * 1024)
};

const multer = require("multer");
const upload = multer({ storage, fileFilter, limits });

module.exports = {
  cloudinary,
  upload,
};
