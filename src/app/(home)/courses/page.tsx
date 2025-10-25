import CourseList from "@/components/course/CourseList";
import FallbackUI from "@/components/FallbackUI";
import { Suspense } from "react";

const CoursePage = async () => {
    return (
        <section className="page-main-section mt-30 px-5 lg:px-0 pb-4 lg:pb-8 ">
            <div className=" mb-8">
                <h2 className="text-2xl text-slate-600 font-bold">
                    Courses to get you started
                </h2>
                <p className="text-gray-600">
                    Explore courses from experienced, real-world experts.
                </p>
            </div>
            <Suspense fallback={<FallbackUI title="Loading Courses" />}>
                <CourseList />
            </Suspense>
        </section>
    );
};

export default CoursePage;
