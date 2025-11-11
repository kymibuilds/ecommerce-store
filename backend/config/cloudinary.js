import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  const url = process.env.CLOUDINARY_URL;
  if (!url) {
    console.error("Missing CLOUDINARY_URL in environment variables");
    process.exit(1);
  }

  cloudinary.config({
    cloudinary_url: url,
  });

  console.log("Cloudinary configured successfully");
};

export default connectCloudinary;
