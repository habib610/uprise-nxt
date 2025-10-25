import { IconType } from "react-icons";

export type CreditCardType = {
    title: string;
    icon?: IconType;
    value: number;
    subTitle: string;
    className?: string;
};

export type DashboardInfoType = {
    totalReferred: number;
    earnedCredit: number;
    pendingCredit: number;
    purchasedUser: number;
    code: string;
};
