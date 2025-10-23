import mongoose, { Document } from "mongoose";

export interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredBy?: mongoose.Schema.Types.ObjectId;
    avatar?: string;
    role: string;
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
    rating: mongoose.Schema.Types.ObjectId;
    updatedAt: Date;
}

export interface ReferralSchemaType {
    referrer: mongoose.Schema.Types.ObjectId;
    referred?: mongoose.Schema.Types.ObjectId;
    isConverted: boolean;
}

export interface RatingSchemaType {
    user: mongoose.Schema.Types.ObjectId;
    description: string;
    rate: number;
    course: mongoose.Schema.Types.ObjectId;
}
