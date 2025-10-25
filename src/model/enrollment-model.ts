import { TABLES } from "@/constants/dbConstants";
import { EnrollmentSchemaType } from "@/types/schema";
import mongoose, { Model, Schema } from "mongoose";

export const enrollmentSchema = new Schema<EnrollmentSchemaType>({
    enrolledDate: {
        required: true,
        type: Date,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["stripe"],
        required: true,
        default: "stripe",
    },
    method: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLES.COURSE,
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLES.USER,
    },
});

export const enrollmentModel: Model<EnrollmentSchemaType> =
    mongoose.models[TABLES.ENROLLMENT] ??
    mongoose.model<EnrollmentSchemaType>(TABLES.ENROLLMENT, enrollmentSchema);
