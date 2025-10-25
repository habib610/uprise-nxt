import { ROLE, TABLES } from "@/constants/dbConstants";
import { UserSchemaType } from "@/types/schema";
import mongoose, { Model, Schema } from "mongoose";

export const userSchema = new Schema<UserSchemaType>(
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
            unique: true,
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
        credit: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const userModel: Model<UserSchemaType> =
    mongoose.models[TABLES.USER] ||
    mongoose.model<UserSchemaType>(TABLES.USER, userSchema);
