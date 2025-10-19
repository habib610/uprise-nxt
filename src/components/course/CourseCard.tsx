import { COURSES } from "@/constants/appConstants";
import { CoursesDataType } from "@/types/course";
import Image from "next/image";
import Link from "next/link";
import { GiRoundStar } from "react-icons/gi";
import { IoMdClock } from "react-icons/io";

const CourseCard = ({
    id,
    thumbnail,
    category,
    title,
    rating,
    duration,
    price,
    discount,
}: CoursesDataType) => {
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
        <div className="border border-gray-200 rounded-2xl  max-w-[400px] hover:scale-105 duration-500">
            <div className="h-[200px] relative">
                <Image
                    src={thumbnail}
                    alt={title}
                    className="aspect-video"
                    fill
                />
            </div>
            <div className="px-2 pt-5 pb-3">
                <Link href={`${COURSES}/${id}`}>
                    <h3 className="line-clamp-2  text-xl text-blue-900 font-medium mb-4 hover:text-blue-700">
                        {title}
                    </h3>
                </Link>

                <p className="text-gray-500 mb-3">
                    Category: <span>{category}</span>
                </p>
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <GiRoundStar
                                className="text-yellow-400"
                                size={22}
                            />
                            <p className="text-slate-500 font-medium">
                                <span>{rating}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdClock className="text-teal-500" size={22} />
                            <p className="text-slate-400 ">
                                <span className="font-medium text-slate-500">
                                    {duration}
                                </span>{" "}
                                hours
                            </p>
                        </div>
                    </div>
                    {getPrice(price, discount)}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
