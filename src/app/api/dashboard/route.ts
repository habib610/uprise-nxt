import { TABLES } from "@/constants/dbConstants";
import { courseSchema } from "@/model/course-model";
import { ratingSchema } from "@/model/rating-model";
import { referralModel, referralSchema } from "@/model/referral-model";
import { userModel, userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    console.log(body, "reqBody");
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

        if (!connection.models[TABLES.REFERRAL]) {
            mongoose.model(TABLES.REFERRAL, referralSchema);
        }
        console.log(body.email);

        /* @TODO => Read from auth session @habib610 Fri October 24,2025 */
        const user = await userModel.findOne({ email: body.email });

        if (!user) {
            throw new Error("User not found");
        }

        const totalUser = await referralModel
            .find({
                referrer: user._id,
            })
            .select(["isPurchased"]);
        console.log(totalUser);
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
                    earnedCredit: user.credit || 0,
                    pendingCredit: totalReferred - purchasedUser,
                    purchasedUser: purchasedUser,
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
