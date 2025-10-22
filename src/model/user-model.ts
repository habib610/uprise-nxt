import { ROLE, TABLES } from "@/constants/dbConstants";
import { UserType } from "@/types/user";
import mongoose, { Model, Schema } from "mongoose";

const userSchema = new Schema<UserType>(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
            minLength: 3,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
        },
        referralCode: {
            type: String,
            required: true,
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLES.USER,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: [ROLE.USER, ROLE.INSTRUCTOR],
            default: ROLE.USER,
        },
        isReferralEligible: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const userModel: Model<UserType> =
    mongoose.models[TABLES.USER] || mongoose.model(TABLES.USER, userSchema);
