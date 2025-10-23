export const TABLES = {
    USER: "User",
    RATING: "Rating",
    COURSE: "Course",
    ENROLLMENT: "Enrollment",
};

export const ROLE = {
    USER: "user",
    INSTRUCTOR: "instructor",
};

export const MONGODB_CONNECTION_URI: string = (
    process.env.NODE_ENV === "production"
        ? process.env.MONGODB_CONNECTION_URI_PROD
        : process.env.MONGODB_CONNECTION_URI_DEV
) as string;
