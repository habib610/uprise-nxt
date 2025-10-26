import { enrollmentModel } from "@/model/enrollment-model";
import { referralModel } from "@/model/referral-model";
import { userModel } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { CoursesCardDataType, PopulatedCourse } from "@/types/course";
import { auth } from "../../../auth";

export const getUserDashboardInfo = async () => {
    const session = await auth();
    try {
        await connectMongoDB();

        const user = await userModel.findOne({ email: session?.user?.email });

        if (!user) {
            throw new Error("User not found");
        }
        const totalReferred = await referralModel.countDocuments({
            referrer: user._id,
        });
        const purchasedUser = await referralModel.countDocuments({
            referrer: user._id,
            isPurchased: true,
        });

        const enrolled = await enrollmentModel
            .find({ user: user._id })
            .select(["amount"])
            .populate<{ course: PopulatedCourse }>(
                "course",
                "_id title category thumbnail price duration "
            );

        const formattedEnrolledCourse: CoursesCardDataType[] = enrolled.map(
            (course) => ({
                _id: course._id.toString(),
                title: course.course.title,
                category: course.course.category,
                duration: course.course.duration,
                price: course.course.price,
                thumbnail: course.course.thumbnail,
            })
        );

        const data = {
            totalReferred,
            earnedCredit: user.credit || 0,
            pendingCredit: totalReferred - purchasedUser,
            purchasedUser,
            code: user.referralCode,
            enrolled: formattedEnrolledCourse,
        };

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        console.error(error);

        throw new Error("User info currently not available");
    }
};
