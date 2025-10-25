import { getCourseDetailsById } from "@/app/actions/course";
import CourseInstructor from "@/components/course/CourseInstructor";
import CoursePayment from "@/components/course/CoursePayment";
import CoursePrice from "@/components/course/CoursePrice";
import CourseTag from "@/components/course/CourseTag";
import { COURSES } from "@/constants/appConstants";
import { getCourseFinalPrice } from "@/helpers";
import { CoursesDataType, Params } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { auth } from "../../../auth";

const CourseDetails = async ({ params }: Params) => {
    const session = await auth();
    const courseDetails: CoursesDataType = await getCourseDetailsById(
        params.courseId
    );
    const courseDescriptions: string[] = courseDetails.description.split("\n");
    return (
        <div>
            <div className="container px-4 lg:px-6 mx-auto max-w-[900px]">
                <div className="h-[200px] lg:h-[300px] xl:h-[400px] relative mb-3 lg:mb-5">
                    <Image
                        src={courseDetails.thumbnail}
                        alt={courseDetails.title}
                        className="object-cover"
                        fill
                    />
                    {!courseDetails.canEnroll && (
                        <div className="px-4 py-1  bg-amber-500 inline-flex text-white absolute bottom-0 left-0 mb-2">
                            Already Enrolled
                        </div>
                    )}
                </div>
                <div className="px-2">
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center gap-1">
                            <CourseTag
                                icon={AiOutlineClockCircle}
                                value={courseDetails.duration}
                                subtitle={"Hours"}
                            />
                            <CourseTag
                                icon={IoEyeOutline}
                                value={courseDetails.enrolled}
                                subtitle={"Enrolled"}
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

                    {courseDetails.canEnroll ? (
                        <CoursePayment
                            isLoggedIn={session !== null}
                            courseId={params.courseId}
                            title={courseDetails.title}
                            price={getCourseFinalPrice(
                                courseDetails.price,
                                courseDetails.discount
                            )}
                        />
                    ) : (
                        <Link
                            className="btn-primary bg-violet-800"
                            href={COURSES}
                        >
                            Visit More courses
                        </Link>
                    )}

                    <CourseInstructor
                        name={courseDetails.instructor.name}
                        avatar={courseDetails.instructor.avatar}
                        email={courseDetails.instructor.email}
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
