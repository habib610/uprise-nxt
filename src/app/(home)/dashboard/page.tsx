import CreditCard from "@/components/dashboard/CreditCard";
import DashboardHead from "@/components/dashboard/DashboardHead";
import { getUserDashboardInfo } from "@/lib/api/dasboard";
import { checkAuth } from "@/lib/auth";
import { DashboardInfoType } from "@/types/dashboard";

const DashboardPage = async () => {
    await checkAuth();

    const data: DashboardInfoType = await getUserDashboardInfo();

    return (
        <section className="min-h-screen pt-25 pb-8 lg:pt-30">
            <div className="container mx-auto px-4 lg:px-0">
                <DashboardHead code={`LINA12`} />

                <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-y-8">
                    <CreditCard
                        title="Referred Users"
                        value={data?.totalReferred}
                        subTitle="Whom are referred by you"
                        className="from-pink-500"
                    />
                    <CreditCard
                        title="Total Credit"
                        value={data.earnedCredit}
                        subTitle="You earned via referral"
                        className="from-green-500"
                    />{" "}
                    <CreditCard
                        title="Purchased User"
                        value={data.purchasedUser}
                        subTitle="Completed first purchase"
                        className="from-blue-500"
                    />{" "}
                    <CreditCard
                        title="Pending User"
                        value={data.pendingCredit}
                        subTitle="User who may purchased"
                        className="from-orange-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
