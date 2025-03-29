import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface UserSignupBody {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    uploads: Types.ObjectId[];
}

export interface UploadProps {
    videoUrl: string;
}

export interface FeedbackProps {
    feedback: "yes" | "no" | "don't know";
    id: Types.ObjectId
}
