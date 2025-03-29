import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    modelResult: {
        type: String,
        enum: ["real", "fake"],
        required: true
    },
    positiveReviews: {
        type: Number,
        default: 0,
        required: true
    },
    negativeReviews: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

const Upload = mongoose.model("Upload", UploadSchema);
export default Upload;