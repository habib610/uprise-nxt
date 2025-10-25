import { referralModel } from "@/model/referral-model";
import { userModel } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { auth } from "../../../auth";

export const getUserDashboardInfo = async () => {
    const session = await auth();
    try {
        await connectMongoDB();

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
