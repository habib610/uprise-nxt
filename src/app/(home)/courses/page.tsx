import CourseCard from "@/components/course/CourseCard";
import { COURSE_API_ENDPOINT } from "@/constants/appConstants";
import { CoursesCardDataType } from "@/types/course";

const CoursePage = async () => {
    const res = await fetch(COURSE_API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch courses");
    }
    const { courses }: { courses: CoursesCardDataType[] } = await res.json();

    return (
        <section className="page-main-section mt-30 px-5 lg:px-0 ">
            <div className=" mb-8">
                <h2 className="text-2xl text-slate-600 font-bold">
                    Courses to get you started
                </h2>
                <p className="text-gray-600">
                    Explore courses from experienced, real-world experts.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-9 lg:gap-y-12 md:gap-x-6  xl:gap-x-7 2xl:gap-x-8 items-center place-items-center ">
                {courses.map((course) => (
                    <CourseCard key={course._id} {...course} />
                ))}
            </div>
        </section>
    );
};

export default CoursePage;
