import DashboardCreditInfo from "@/components/dashboard/DashboardCreditInfo";
import { checkAuth } from "@/lib/auth";

const DashboardPage = async () => {
    await checkAuth();

    return (
        <section className="min-h-screen pt-25 pb-8 lg:pt-30">
            <DashboardCreditInfo />
        </section>
    );
};

export default DashboardPage;
