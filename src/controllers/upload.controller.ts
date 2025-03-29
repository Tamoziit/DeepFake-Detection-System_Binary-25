import { Request, Response } from "express";
import User from "../models/user.model";
import Upload from "../models/uploads.model";
import { FeedbackProps, UploadProps } from "../types";

export const uploadVideo = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { videoUrl }: UploadProps = req.body;

        if (!id) {
            res.status(400).json({ error: "User id is required" });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const newVideo = new Upload({
            userId: id,
            videoUrl,
            modelResult: "fake",
        });

        if (newVideo) {
            await Promise.all([
                newVideo.save(),
                (async () => {
                    user.uploads.push(newVideo._id);
                    await user.save();
                })(),
            ]);

            res.status(201).json(newVideo);
        } else {
            res.status(400).json({ error: "Couldn't Upload video" });
        }
    } catch (error) {
        console.log("Error in uploadVideo controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUploads = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const totalUploads = await Upload.countDocuments({ userId: { $ne: id } });

        const uploads = await Upload.find({ userId: { $ne: id } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            totalPages: Math.ceil(totalUploads / limit),
            currentPage: page,
            totalUploads,
            uploads,
        });
    } catch (error) {
        console.log("Error in getUploads controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateFeedback = async (req: Request, res: Response) => {
    try {
        const { feedback, id }: FeedbackProps = req.body;
        if (!feedback) {
            res.status(400).json({ error: "Couldn't register feedback" });
            return;
        }

        if (feedback !== "yes" && feedback !== "no" && feedback !== "don't know") {
            res.status(400).json({ error: "Invalid Feedback" });
            return;
        }

        if (!id) {
            res.status(400).json({ error: "Video id is required" });
            return;
        }

        const upload = await Upload.findById(id);
        if (!upload) {
            res.status(400).json({ error: "Couldn't find Video" });
            return;
        }

        if (feedback === "yes") {
            upload.negativeReviews = (upload.negativeReviews || 0) + 1;
        } else if (feedback === "no") {
            upload.positiveReviews = (upload.positiveReviews || 0) + 1;
        }

        await upload.save();
        res.status(200).json(upload);
    } catch (error) {
        console.log("Error in updateFeedback controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}