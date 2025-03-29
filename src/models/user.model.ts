import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    uploads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Uploads"
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;