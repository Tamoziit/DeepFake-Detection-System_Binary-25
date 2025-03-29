import React, { useState } from "react";
import { uploadVideoToCloudinary } from "./utils/uploadToCloudinary";

const VideoUpload = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!videoFile) {
            alert("Please select a video file.");
            return;
        }

        setUploading(true);
        try {
            const uploadedUrl = await uploadVideoToCloudinary(videoFile);
            setVideoUrl(uploadedUrl);
            alert("Video uploaded successfully!");
        } catch (error) {
            console.error(error);
            alert("Video upload failed.");
        } finally {
            setUploading(false);
        }
    };

    console.log(videoFile);
    console.log(videoUrl);

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Upload Video</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>

            {videoUrl && (
                <div className="mt-4">
                    <h3 className="font-semibold">Uploaded Video:</h3>
                    <video controls className="w-full">
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
