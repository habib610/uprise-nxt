import { courseModel } from "@/model/course-model";
import { enrollmentModel } from "@/model/enrollment-model";
import { referralModel } from "@/model/referral-model";
import { userModel } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { CheckoutType } from "@/types/checkout";
import { auth } from "../../../auth";

export const completeCourseEnrollment = async (body: CheckoutType) => {
    try {
        console.log(body, "BODY");
        const session = await auth();
        await connectMongoDB();

        console.log(session, "SESSION");
        if (!session?.user?.email) throw new Error("You are not authorized");

        const user = await userModel.findOne({ email: session.user.email });

        console.log(user, "user");
        if (!user) throw new Error("User not found");

        const course = await courseModel.findById(body.courseId);
        console.log("course", course);
        if (!course) throw new Error("Course not found");

        if (!body.amount || typeof body.amount !== "number")
            throw new Error("Amount is required");

        const isAlreadyEnrolled = await enrollmentModel.findOne({
            user: user._id,
            course: body.courseId,
        });

        console.log("isAlreadyEnrolled", isAlreadyEnrolled);
        if (isAlreadyEnrolled)
            return {
                success: false,
                message: "You have already enrolled to this course",
            };

        console.log(user._id);
        console.log(body.amount);
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

                user.credit = (user.credit ?? 0) + 2;
                await user.save();

                const referrer = await userModel.findById(user.referredBy);
                if (referrer) {
                    referrer.credit = (referrer.credit ?? 0) + 2;
                    await referrer.save();
                }
            }
        }

        return {
            success: true,
            message: "Course enrollment completed successfully",
            data: purchaseResult._id,
        };
    } catch (error) {
        console.error("Enrollment Error:", error);
        throw new Error("Can't purchase at the moment");
    }
};
