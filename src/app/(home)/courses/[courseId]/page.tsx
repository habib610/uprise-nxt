import CourseInstructor from "@/components/course/CourseInstructor";
import CoursePayment from "@/components/course/CoursePayment";
import CoursePrice from "@/components/course/CoursePrice";
import CourseTag from "@/components/course/CourseTag";
import { courses } from "@/databases/seed/courses-db";
import { CoursesDataType } from "@/types/course";
import Image from "next/image";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";

const CourseDetailsPage = () => {
    const courseDetails: CoursesDataType = courses[0];
    const courseDescriptions: string[] = courseDetails.description.split("\n");
    return (
        <section className="min-h-screen pt-25 lg:pt-30 pb-4 lg:pb-8">
            <div className="container px-4 lg:px-6 mx-auto max-w-[900px]">
                <div className="h-[200px] lg:h-[300px] xl:h-[400px] relative mb-3 lg:mb-5">
                    <Image
                        src={courseDetails.thumbnail}
                        alt={courseDetails.title}
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-1">
                            <CourseTag
                                icon={AiOutlineClockCircle}
                                value={courseDetails.duration}
                            />
                            <CourseTag
                                icon={IoEyeOutline}
                                value={courseDetails.enrolled}
                            />
                        </div>

                        <CoursePrice
                            price={courseDetails.price}
                            discount={courseDetails.discount}
                            className="bg-gray-100 px-4 py-1 rounded-lg"
                        />
                    </div>
                    <div className=" mt-3 lg:mt-4">
                        <CourseTag value={courseDetails.category} />
                    </div>
                    <h2 className="text-xl lg:text-2xl font-semibold my-4 lg:my-6">
                        {courseDetails.title}
                    </h2>
                    <h3 className="text-gray-500 text-lg lg:text-xl mb-3 lg:mb-5">
                        {courseDetails.subtitle}
                    </h3>

                    {courseDescriptions.map((desc, index) => (
                        <p
                            key={index}
                            className="text-gray-700 text-sm md:text-base lg:text-lg  whitespace-pre-line mb-2 lg:mb-4"
                        >
                            {desc}
                        </p>
                    ))}

                    <CoursePayment />

                    <CourseInstructor
                        name={courseDetails.instructor.name}
                        avatar={courseDetails.instructor.avatar}
                    />
                </div>
            </div>
        </section>
    );
};

export default CourseDetailsPage;
