import { COURSES } from "@/constants/appConstants";
import { courses } from "@/databases/seed/courses-db";
import Image from "next/image";
import Link from "next/link";
import { BsFillStarFill } from "react-icons/bs";
import { IoMdClock } from "react-icons/io";

const CoursePage = () => {
    const getPrice = (price: number, discount: number): JSX.Element => {
        const finalPrice: number = discount
            ? price - (price * discount) / 100
            : price;
        return (
            <div className="flex items-center gap-2">
                {discount > 0 && (
                    <p className="line-through text-gray-400">${price}</p>
                )}
                <p className="text-primary font-bold text-xl">${finalPrice}</p>
            </div>
        );
    };
    return (
        <section className="page-main-section mt-30 ">
            <div className=" mb-8">
                <h2 className="text-2xl text-slate-600 font-bold">
                    Courses to get you started
                </h2>
                <p className="text-gray-600">
                    Explore courses from experienced, real-world experts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-7 2xl:gap-8">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="border border-gray-200 rounded-2xl hover:cursor-pointer"
                    >
                        <div className="h-[200px] relative">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                className="object-cover"
                                fill
                            />
                        </div>
                        <div className="px-2 pt-5 pb-3">
                            <Link href={`${COURSES}/${course.id}`}>
                                <h3 className="line-clamp-2  text-xl text-blue-900 font-medium mb-4">
                                    {course.title}
                                </h3>
                            </Link>

                            <p className="text-gray-500 mb-3">
                                Category: <span>{course.category}</span>
                            </p>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <BsFillStarFill
                                            className="text-yellow-500"
                                            size={22}
                                        />
                                        <p>{course.rating}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IoMdClock
                                            className="text-yellow-500"
                                            size={22}
                                        />
                                        <p>{course.duration} hours</p>
                                    </div>
                                </div>
                                {getPrice(course.price, course.discount)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoursePage;
