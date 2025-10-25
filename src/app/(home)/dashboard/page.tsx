import DashboardCreditInfo from "@/components/dashboard/DashboardCreditInfo";
import FallbackUI from "@/components/FallbackUI";
import { checkAuth } from "@/lib/auth";
import { Suspense } from "react";

const DashboardPage = async () => {
    await checkAuth();

    return (
        <section className="min-h-screen pt-25 pb-8 lg:pt-30">
            <Suspense fallback={<FallbackUI title="Loading Dashboard info" />}>
                <DashboardCreditInfo />
            </Suspense>
        </section>
    );
};

export default DashboardPage;
