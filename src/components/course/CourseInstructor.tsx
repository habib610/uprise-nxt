import { InstructorType } from "@/types/course";
import Image from "next/image";

const CourseInstructor = ({ name, avatar }: InstructorType) => {
    return (
        <div className="mt-9">
            <h3 className="font-bold mb-3 text-xl text-gray-700 ">
                Course Instructor
            </h3>
            <div className="flex items-center gap-2">
                <div className="w-15 h-15 rounded-full relative border border-gray-200 flex items-center justify-center">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={name}
                            fill
                            className="rounded-full"
                        />
                    ) : (
                        <p className="text-4xl font-bold text-primary">
                            {name.charAt(0)}
                        </p>
                    )}
                </div>
                <p className="text-primary">{name}</p>
            </div>
        </div>
    );
};

export default CourseInstructor;
