import { TABLES } from "@/constants/dbConstants";
import { courseModel, courseSchema } from "@/model/course-model";
import { ratingSchema } from "@/model/rating-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const connection = await connectMongoDB();

        if (!connection.models[TABLES.COURSE]) {
            mongoose.model(TABLES.COURSE, courseSchema);
        }

        if (!connection.models[TABLES.RATING]) {
            mongoose.model(TABLES.RATING, ratingSchema);
        }
        const courses = await courseModel.find().populate("rating", "rate");
        return NextResponse.json(
            {
                success: true,
                courses: courses,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { success: true, message: error.message },
                { status: 500 }
            );
        }

        return new Response("Something went wrong", { status: 500 });
    }
};
