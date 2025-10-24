import { TABLES } from "@/constants/dbConstants";
import { ReferralSchemaType } from "@/types/schema";
import mongoose, { Model, Schema } from "mongoose";

const referralSchema = new Schema<ReferralSchemaType>(
    {
        referrer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLES.USER,
        },
        referred: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLES.USER,
            unique: true,
        },
        isPurchased: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const referralModel: Model<ReferralSchemaType> =
    mongoose.models[TABLES.REFERRAL] ??
    mongoose.model<ReferralSchemaType>(TABLES.REFERRAL, referralSchema);
