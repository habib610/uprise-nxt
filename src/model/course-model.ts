import { TABLES } from "@/constants/dbConstants";
import { CourseSchemaType } from "@/types/schema";
import mongoose, { Model, Schema } from "mongoose";

const courseSchema = new Schema<CourseSchemaType>(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        duration: {
            type: Number,
            required: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: TABLES.USER,
        },
        rating: {
            ref: TABLES.RATING,
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const courseModel: Model<CourseSchemaType> =
    mongoose.models[TABLES.COURSE] ||
    mongoose.model<CourseSchemaType>(TABLES.COURSE, courseSchema);
