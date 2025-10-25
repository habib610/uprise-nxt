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
        const totalReferred = await referralModel.countDocuments({
            referrer: user._id,
        });
        const purchasedUser = await referralModel.countDocuments({
            referrer: user._id,
            isPurchased: true,
        });

        const data = {
            totalReferred,
            earnedCredit: user.credit || 0,
            pendingCredit: totalReferred - purchasedUser,
            purchasedUser,
            code: user.referralCode,
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
