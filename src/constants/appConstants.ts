import { NavLink } from "@/types/app";
export const isProdEnv = process.env.NODE_ENV === "production";
export const HOME: string = "/";
export const DASHBOARD: string = "/dashboard";
export const COURSES: string = "/courses";
export const LOGIN: string = "/login";
export const REGISTRATION: string = "/registration";

export const HOST = (
    isProdEnv ? process.env.BASE_PROD_URI : process.env.BASE_DEV_URI
) as string;

export const API_URI = (
    isProdEnv
        ? process.env.NEXT_PUBLIC_SITE_URI_PROD
        : process.env.NEXT_PUBLIC_SITE_URI_DEV
) as string;

export const NAV_LINKS: NavLink[] = [
    {
        id: 1,
        name: "Dashboard",
        path: DASHBOARD,
    },
    {
        id: 2,
        name: "Courses",
        path: COURSES,
    },
];

export const COURSE_API_ENDPOINT = `${API_URI}/course`;
export const DASHBOARD_INFO_API_ENDPOINT = `${API_URI}/dashboard`;
export const REGISTRATION_API_ENDPOINT = `${API_URI}/auth/registration`;
export const LOGIN_API_ENDPOINT = `${API_URI}/auth/login`;
