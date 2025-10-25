import { TABLES } from "@/constants/dbConstants";
import { courseModel, courseSchema } from "@/model/course-model";
import { enrollmentModel, enrollmentSchema } from "@/model/enrollment-model";
import { ratingSchema } from "@/model/rating-model";
import { referralModel, referralSchema } from "@/model/referral-model";
import { userModel, userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { CheckoutType } from "@/types/checkout";
import mongoose from "mongoose";
import { auth } from "../../../auth";

export const completeCourseEnrollment = async (body: CheckoutType) => {
    try {
        const session = await auth();
        const connection = await connectMongoDB();
        if (!session?.user?.email) throw new Error("You are not authorized");

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

        const user = await userModel.findOne({ email: session?.user?.email });
        if (!user) throw new Error("User not found");

        const course = await courseModel.findById(body.courseId);
        if (!course) throw new Error("Course not found");

        const isAlreadyEnrolled = await enrollmentModel.findOne({
            user: user._id,
            course: body.courseId,
        });

        if (isAlreadyEnrolled)
            return {
                success: false,
                message: "You have already enrolled to this course",
            };

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

        return {
            success: true,
            message: "You have already enrolled to this course",
            data: purchaseResult._id,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Can't purchased at the moment");
    }
};
