import { TABLES } from "@/constants/dbConstants";
import { courseModel, courseSchema } from "@/model/course-model";
import { ratingSchema } from "@/model/rating-model";
import { userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type Params = {
    params: {
        courseId: string;
    };
};

export const GET = async (req: Request, { params }: Params) => {
    try {
        const connection = await connectMongoDB();

        if (!connection.models[TABLES.COURSE]) {
            mongoose.model(TABLES.COURSE, courseSchema);
        }

        if (!connection.models[TABLES.RATING]) {
            mongoose.model(TABLES.RATING, ratingSchema);
        }

        if (!connection.models[TABLES.USER]) {
            mongoose.model(TABLES.USER, userSchema);
        }

        const course = await courseModel
            .findById(params.courseId)
            .populate("rating", "rate")
            .populate("instructor", "name email avatar");

        return NextResponse.json(
            {
                success: true,
                course: course,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        console.error(error);
        return Response.json(
            { success: false, message: "Course not found" },
            { status: 404 }
        );
    }
};
