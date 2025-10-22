import mongoose, { Document } from "mongoose";

export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredBy?: mongoose.Schema.Types.ObjectId;
    avatar?: string;
    role: string;
    isReferralEligible: boolean;
}
