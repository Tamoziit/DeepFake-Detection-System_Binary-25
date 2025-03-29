import axios from "axios";

export const uploadVideoToCloudinary = async (file: File): Promise<string> => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhjyjsyvt/video/upload";
    const CLOUDINARY_UPLOAD_PRESET = "Deepfake-Detection-Service";

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Cloudinary preset for uploads

        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.secure_url; // The video URL from Cloudinary
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload video.");
    }
};
