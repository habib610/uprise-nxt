import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/databases/seed/courses-db";

const CoursePage = () => {
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
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </section>
    );
};

export default CoursePage;
