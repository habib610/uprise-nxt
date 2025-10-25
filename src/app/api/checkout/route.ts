import { TABLES } from "@/constants/dbConstants";
import { courseModel, courseSchema } from "@/model/course-model";
import { enrollmentModel, enrollmentSchema } from "@/model/enrollment-model";
import { ratingSchema } from "@/model/rating-model";
import { referralModel, referralSchema } from "@/model/referral-model";
import { userModel, userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
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

        if (!connection.models[TABLES.ENROLLMENT]) {
            mongoose.model(TABLES.ENROLLMENT, enrollmentSchema);
        }

        const user = await userModel.findOne({ email: body.email });
        if (!user)
            return NextResponse.json(
                { success: false, message: "User not found" },
                {
                    status: 404,
                }
            );
        const course = await courseModel.findById(body.courseId);
        if (!course)
            return NextResponse.json(
                { success: false, message: "Course not found" },
                {
                    status: 404,
                }
            );

        const isAlreadyEnrolled = await enrollmentModel.findOne({
            user: user._id,
            course: body.courseId,
        });

        if (isAlreadyEnrolled)
            return NextResponse.json(
                {
                    success: true,
                    message: "You have already enrolled to this course",
                },
                {
                    status: 200,
                }
            );

        const purchaseResult = await enrollmentModel.create({
            course: body.courseId,
            user: user._id,
            method: body.paymentMethod,
            status: "completed",
            amount: body.amount,
            enrolledDate: new Date(),
        });

        if (user.referredBy) {
            const referral = await referralModel.findOne({
                referrer: user.referredBy,
            });

            if (referral && !referral.isPurchased) {
                referral.isPurchased = true;
                await referral.save();

                user.credit = +2;
                await user.save();

                const referrer = await userModel.findById(user.referredBy);
                if (referrer) {
                    referrer.credit += 2;
                    await referrer.save();
                }
            }
        }

        return NextResponse.json(
            { success: true, data: purchaseResult },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Registration Failed",
            },
            {
                status: 500,
            }
        );
    }
};
