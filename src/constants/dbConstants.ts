export const TABLES = {
    USER: "user",
    RATING: "rating",
    COURSE: "course",
    ENROLLMENT: "enrollment",
    REFERRAL: "referral",
};

export const ROLE = {
    USER: "user",
    INSTRUCTOR: "instructor",
};

export const MONGODB_CONNECTION_URI = (
    process.env.NODE_ENV === "production"
        ? process.env.MONGODB_CONNECTION_URI_PROD
        : process.env.MONGODB_CONNECTION_URI_DEV
) as string;
