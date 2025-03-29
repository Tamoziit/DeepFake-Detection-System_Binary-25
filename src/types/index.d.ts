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
    chatStreams: Types.ObjectId[];
}