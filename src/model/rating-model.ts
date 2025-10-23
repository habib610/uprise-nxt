import { TABLES } from "@/constants/dbConstants";
import { RatingSchemaType } from "@/types/schema";
import mongoose, { Model, Schema } from "mongoose";

export const ratingSchema = new Schema<RatingSchemaType>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLES.USER,
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: TABLES.COURSE,
            required: true,
        },
        description: {
            type: String,
            maxLength: 250,
        },
        rate: {
            required: true,
            type: Number,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

export const ratingModel: Model<RatingSchemaType> =
    mongoose.models[TABLES.RATING] ??
    mongoose.model<RatingSchemaType>(TABLES.RATING, ratingSchema);
