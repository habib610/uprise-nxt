import mongoose, { Document } from "mongoose";

export interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredBy?: mongoose.Types.ObjectId;
    avatar?: string;
    role: string;
    credit: number;
}

export interface CourseSchemaType extends Document {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    enrolled: number;
    instructor: mongoose.Types.ObjectId;
    thumbnail: string;
    price: number;
    discount: number;
    duration: number;
    rating: mongoose.Types.ObjectId;
    updatedAt: Date;
}

export interface ReferralSchemaType {
    referrer: mongoose.Types.ObjectId;
    referred?: mongoose.Types.ObjectId;
    isPurchased: boolean;
}

export interface RatingSchemaType {
    user: mongoose.Types.ObjectId;
    description: string;
    rate: number;
    course: mongoose.Schema.Types.ObjectId;
}

export interface EnrollmentSchemaType {
    enrolledDate: Date;
    status: string;
    method: string;
    paymentType: string;
    amount: number | null;
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
}
