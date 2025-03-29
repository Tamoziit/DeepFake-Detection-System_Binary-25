import express from "express";
import { getUploads, updateFeedback, uploadVideo } from "../controllers/upload.controller";

const router = express.Router();

router.post("/upload-video/:id", uploadVideo);
router.get("/feed/:id", getUploads);
router.post("/feedback", updateFeedback);

export default router;