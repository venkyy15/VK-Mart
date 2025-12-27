import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (localFilePath, folder) => {
  const result = await cloudinary.v2.uploader.upload(localFilePath, {
    folder: `vk-mart/${folder}`
  });

  return result.secure_url;
};
