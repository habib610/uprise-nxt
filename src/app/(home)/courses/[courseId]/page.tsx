import CourseDetails from "@/components/course/CourseDetails";
import FallbackUI from "@/components/FallbackUI";
import { Params } from "@/types/course";
import { Suspense } from "react";

const CourseDetailsPage = async ({ params }: Params) => {
    return (
        <section className="min-h-screen pt-25 lg:pt-30 pb-4 lg:pb-8">
            <Suspense fallback={<FallbackUI title="Loading Course Details" />}>
                <CourseDetails params={params} />
            </Suspense>
        </section>
    );
};

export default CourseDetailsPage;
