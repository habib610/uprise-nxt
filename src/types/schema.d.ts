import mongoose, { Document } from "mongoose";

export interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredBy?: mongoose.Schema.Types.ObjectId;
    avatar?: string;
    role: string;
    isReferralEligible: boolean;
}

export interface CourseSchemaType extends Document {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    enrolled: number;
    instructor: mongoose.Schema.Types.ObjectId;
    thumbnail: string;
    price: number;
    discount: number;
    duration: number;
    rating: number;
    updatedAt: Date;
}
