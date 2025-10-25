import { getAllCourseList } from "@/app/actions/course";
import { CoursesCardDataType } from "@/types/course";
import CourseCard from "./CourseCard";

const CourseList = async () => {
    const courses: CoursesCardDataType[] = await getAllCourseList();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-9 lg:gap-y-12 md:gap-x-6  xl:gap-x-7 2xl:gap-x-8 items-center place-items-center ">
            {courses.map((course) => (
                <CourseCard key={course._id} {...course} />
            ))}
        </div>
    );
};

export default CourseList;
