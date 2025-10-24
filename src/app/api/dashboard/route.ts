import { TABLES } from "@/constants/dbConstants";
import { courseSchema } from "@/model/course-model";
import { ratingSchema } from "@/model/rating-model";
import { referralModel } from "@/model/referral-model";
import { userSchema } from "@/model/user-model";
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

        if (!connection.models[TABLES.USER]) {
            mongoose.model(TABLES.USER, userSchema);
        }

        /* @TODO => Read from auth session @habib610 Fri October 24,2025 */
        const totalUser = await referralModel
            .find({
                referrer: `68fa3c5456274be2af95e29b`,
            })
            .select(["isPurchased"]);
        const totalReferred = totalUser.length;
        const purchasedUser = totalUser.reduce(
            (prev, user) => (user.isPurchased ? prev + 1 : prev),
            0
        );

        return NextResponse.json(
            {
                success: true,
                data: {
                    totalReferred: totalReferred,
                    earnedCredit: purchasedUser * 2,
                    pendingCredit: (totalReferred - purchasedUser) * 2,
                    purchasedUser: totalReferred - purchasedUser,
                },
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
            { success: false, message: "User Info not found" },
            { status: 404 }
        );
    }
};
