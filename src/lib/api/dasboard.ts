import { DASHBOARD_INFO_API_ENDPOINT } from "@/constants/appConstants";
import { DashboardInfoType } from "@/types/dashboard";

export const getUserDashboardInfo = async (): Promise<DashboardInfoType> => {
    const res = await fetch(DASHBOARD_INFO_API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const result = await res.json();
        const message =
            result?.message || `Currently no info available at the moment`;
        throw new Error(message);
    }

    const { data }: { data: DashboardInfoType } = await res.json();
    return data;
};
