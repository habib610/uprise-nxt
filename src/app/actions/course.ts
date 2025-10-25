import { TABLES } from "@/constants/dbConstants";
import { courseModel, courseSchema } from "@/model/course-model";
import { enrollmentModel, enrollmentSchema } from "@/model/enrollment-model";
import { ratingSchema } from "@/model/rating-model";
import { userSchema } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { CoursesCardDataType, CoursesDataType } from "@/types/course";
import mongoose from "mongoose";
import { auth } from "../../../auth";

export const getCourseDetailsById = async (
    courseId: string
): Promise<CoursesDataType> => {
    try {
        const session = await auth();

        const connection = await connectMongoDB();

        if (!connection.models[TABLES.COURSE]) {
            mongoose.model(TABLES.COURSE, courseSchema);
        }

        if (!connection.models[TABLES.RATING]) {
            mongoose.model(TABLES.RATING, ratingSchema);
        }

        if (!connection.models[TABLES.USER]) {
            mongoose.model(TABLES.USER, userSchema);
        }

        if (!connection.models[TABLES.ENROLLMENT]) {
            mongoose.model(TABLES.ENROLLMENT, enrollmentSchema);
        }

        const course = await courseModel
            .findById(courseId)
            .populate("rating", "rate")
            .populate("instructor", "name email avatar");

        if (!course) throw new Error("Course is not found");

        const enrolled = await enrollmentModel.find({ course: course._id });
        let canPurchase = true;
        if (session?.user?.id) {
            const isFound = await enrollmentModel.findOne({
                user: session.user.id,
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
            enrolled: enrolled.length,
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
        const connection = await connectMongoDB();

        if (!connection.models[TABLES.COURSE]) {
            mongoose.model(TABLES.COURSE, courseSchema);
        }

        if (!connection.models[TABLES.RATING]) {
            mongoose.model(TABLES.RATING, ratingSchema);
        }

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
            .populate("rating", "rate")
            .lean();
        return courses.map((course) => ({
            _id: course._id.toString(),
            category: course.category,
            duration: course.duration,
            price: course.price,
            thumbnail: course.thumbnail,
            title: course.title,
            discount: course.discount,
            rating: {
                rate: course.rating?.rate || undefined,
            },
        }));
    } catch (error) {
        console.error(error);

        throw new Error("Something went wrong");
    }
};
