import { courseModel } from "@/model/course-model";
import { enrollmentModel } from "@/model/enrollment-model";
import { userModel } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import {
    CoursesCardDataType,
    CoursesDataType,
    PopulatedInstructor,
    PopulatedRating,
} from "@/types/course";
import { auth } from "../../../auth";

export const getCourseDetailsById = async (
    courseId: string
): Promise<CoursesDataType> => {
    try {
        const session = await auth();

        await connectMongoDB();

        const course = await courseModel
            .findById(courseId)
            .populate<{ rating: PopulatedRating }>("rating", "rate")
            .populate<{ instructor: PopulatedInstructor }>(
                "instructor",
                "name email avatar"
            );

        if (!course) throw new Error("Course is not found");

        const totalEnrolled = await enrollmentModel.countDocuments({
            course: course._id,
        });
        let canPurchase = true;
        if (session?.user?.email) {
            const findUserId = await userModel
                .findOne({ email: session.user.email })
                .select("_id");
            const isFound = await enrollmentModel.findOne({
                user: findUserId?._id,
                course: courseId,
            });

            if (isFound) {
                canPurchase = false;
            }
        }
        return {
            id: course._id as string,
            category: course.category,
            description: course.description,
            discount: course.discount,
            duration: course.duration,
            enrolled: totalEnrolled,
            instructor: {
                name: course.instructor?.name,
                email: course.instructor?.email,
                avatar: course.instructor?.avatar,
            },
            price: course.price,
            rating: course.rating?.rate ?? 0,

            subtitle: course.subtitle,
            thumbnail: course.thumbnail,
            title: course.title,
            canEnroll: canPurchase,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        console.error(error);
        throw new Error("Course not found");
    }
};

export const getAllCourseList = async (): Promise<CoursesCardDataType[]> => {
    try {
        await connectMongoDB();

        const courses = await courseModel
            .find()
            .select([
                "_id",
                "title",
                "category",
                "thumbnail",
                "price",
                "discount",
                "duration",
                "rating",
            ])
            .populate<{ rating: PopulatedRating }>("rating", "rate")
            .lean();

        return courses.map((course) => ({
            _id: course._id.toString(),
            category: course.category,
            duration: course.duration,
            price: course.price,
            thumbnail: course.thumbnail,
            title: course.title,
            discount: course.discount,
            rating: course.rating ? { rate: course.rating.rate } : undefined,
        }));
    } catch (error) {
        console.error(error);

        throw new Error("Something went wrong");
    }
};
