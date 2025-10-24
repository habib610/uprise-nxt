import { COURSE_API_ENDPOINT } from "@/constants/appConstants";
import { CoursesCardDataType, CoursesDataType } from "@/types/course";

export const getAllCourses = async (): Promise<CoursesCardDataType[]> => {
    const res = await fetch(COURSE_API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const result = await res.json();
        const message = result?.message || `No courses available at the moment`;
        throw new Error(message);
    }

    const { data }: { data: CoursesCardDataType[] } = await res.json();
    return data;
};

export const getCourseById = async (
    courseId: string
): Promise<CoursesDataType> => {
    if (!courseId) {
        throw new Error("Course ID is required");
    }

    const res = await fetch(`${COURSE_API_ENDPOINT}/${courseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const result = await res.json();
        const message =
            result?.message ||
            `Requested course with ID ${courseId} is not found`;
        throw new Error(message);
    }

    const { data }: { data: CoursesDataType } = await res.json();
    return data;
};
