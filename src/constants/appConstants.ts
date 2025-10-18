import { NavLink } from "@/types/app";

export const HOME: string = "/";
export const DASHBOARD: string = "/dashboard";
export const COURSES: string = "/courses";
export const LOGIN: string = "/login";
export const REGISTRATION: string = "/registration";

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
