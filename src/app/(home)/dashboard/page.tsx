import CreditCard from "@/components/dashboard/CreditCard";
import DashboardHead from "@/components/dashboard/DashboardHead";

const DashboardPage = () => {
    return (
        <section className="min-h-screen pt-25 pb-8 lg:pt-30">
            <div className="container mx-auto px-4 lg:px-0">
                <DashboardHead code={`LINA12`} />

                <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-y-8">
                    <CreditCard
                        title="Total Credit"
                        value={20}
                        subTitle="You have earned"
                        className="from-pink-500"
                    />{" "}
                    <CreditCard
                        title="Total Credit"
                        value={20}
                        subTitle="You have earned"
                        className="from-green-500"
                    />{" "}
                    <CreditCard
                        title="Total Credit"
                        value={20}
                        subTitle="You have earned"
                        className="from-blue-500"
                    />{" "}
                    <CreditCard
                        title="Total Credit"
                        value={20}
                        subTitle="You have earned"
                        className="from-orange-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
