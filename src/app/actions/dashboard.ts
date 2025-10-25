import { TABLES } from "@/constants/dbConstants";
import { courseSchema } from "@/model/course-model";
import { ratingSchema } from "@/model/rating-model";
import { referralModel, referralSchema } from "@/model/referral-model";
import { userModel, userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import mongoose from "mongoose";
import { auth } from "../../../auth";

export const getUserDashboardInfo = async () => {
    const session = await auth();
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

        /* @TODO => Read from auth session @habib610 Fri October 24,2025 */
        const user = await userModel.findOne({ email: session?.user?.email });

        if (!user) {
            throw new Error("User not found");
        }

        const totalUser = await referralModel
            .find({
                referrer: user._id,
            })
            .select(["isPurchased"]);
        const totalReferred = totalUser.length;
        const purchasedUser = totalUser.reduce(
            (prev, user) => (user.isPurchased ? prev + 1 : prev),
            0
        );

        return {
            totalReferred: totalReferred,
            earnedCredit: user.credit || 0,
            pendingCredit: totalReferred - purchasedUser,
            purchasedUser: purchasedUser,
            code: user.referralCode,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        console.error(error);

        throw new Error("User info currently not available");
    }
};
