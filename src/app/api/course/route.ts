import { TABLES } from "@/constants/dbConstants";
import { courseModel } from "@/model/course-model";
import { userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const connection = await connectMongoDB();
        if (!connection.models[TABLES.USER]) {
            mongoose.model(TABLES.USER, userSchema);
        }

        const courses = await courseModel
            .find()
            .populate("instructor", "name email avatar");
        return NextResponse.json(
            {
                success: true,
                data: courses,
            },
            {
                status: 201,
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
