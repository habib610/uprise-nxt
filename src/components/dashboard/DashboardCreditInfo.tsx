import { getUserDashboardInfo } from "@/app/actions/dashboard";
import CreditCard from "@/components/dashboard/CreditCard";
import DashboardHead from "@/components/dashboard/DashboardHead";
import { DashboardInfoType } from "@/types/dashboard";
import DashboardCourseList from "./DashboardCourseList";

const DashboardCreditInfo = async () => {
    const data: DashboardInfoType = await getUserDashboardInfo();
    return (
        <div className="container mx-auto px-4 lg:px-0">
            <DashboardHead code={data.code} />

            <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-y-8 items-start ">
                <CreditCard
                    title="Referred Users"
                    value={data?.totalReferred}
                    subTitle="Users referred by you"
                    className="from-pink-500"
                />

                <CreditCard
                    title="Total Credits"
                    value={data.earnedCredit}
                    subTitle="Credits earned through referrals"
                    className="from-green-500"
                />

                <CreditCard
                    title="Converted Users"
                    value={data.purchasedUser}
                    subTitle="Users who completed their first purchase"
                    className="from-blue-500"
                />

                <CreditCard
                    title="Pending Users"
                    value={data.pendingCredit}
                    subTitle="Signed up but not purchased yet"
                    className="from-orange-500"
                />
            </div>

            <h2 className="px-4 mt-8 lg:mt-12 mb-5 text-2xl md:text-3xl ">
                Your Courses
            </h2>
            <DashboardCourseList enrolled={data.enrolled} />
        </div>
    );
};

export default DashboardCreditInfo;
