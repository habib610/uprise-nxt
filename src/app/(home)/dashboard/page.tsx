import { getUserDashboardInfo } from "@/app/actions/dashboard";
import CreditCard from "@/components/dashboard/CreditCard";
import DashboardHead from "@/components/dashboard/DashboardHead";
import { checkAuth } from "@/lib/auth";
import { DashboardInfoType } from "@/types/dashboard";

const DashboardPage = async () => {
    await checkAuth();

    const data: DashboardInfoType = await getUserDashboardInfo();

    return (
        <section className="min-h-screen pt-25 pb-8 lg:pt-30">
            <div className="container mx-auto px-4 lg:px-0">
                <DashboardHead code={data.code} />

                <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-y-8 ">
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
            </div>
        </section>
    );
};

export default DashboardPage;
