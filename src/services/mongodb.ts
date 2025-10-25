import { MONGODB_CONNECTION_URI, TABLES } from "@/constants/dbConstants";

import { courseSchema } from "@/model/course-model";
import { enrollmentSchema } from "@/model/enrollment-model";
import { ratingSchema } from "@/model/rating-model";
import { userSchema } from "@/model/user-model";
import mongoose from "mongoose";

export const defineAllModels = (): void => {
    if (!mongoose.models[TABLES.COURSE]) {
        mongoose.model(TABLES.COURSE, courseSchema);
    }

    if (!mongoose.models[TABLES.RATING]) {
        mongoose.model(TABLES.RATING, ratingSchema);
    }

    if (!mongoose.models[TABLES.USER]) {
        mongoose.model(TABLES.USER, userSchema);
    }

    if (!mongoose.models[TABLES.ENROLLMENT]) {
        mongoose.model(TABLES.ENROLLMENT, enrollmentSchema);
    }
    if (!mongoose.models[TABLES.REFERRAL]) {
        mongoose.model(TABLES.REFERRAL, enrollmentSchema);
    }
};

if (!MONGODB_CONNECTION_URI) {
    throw new Error("Connection URI is not found in environment");
}

let isConnected: boolean = false;

export const connectMongoDB = async (): Promise<typeof mongoose> => {
    try {
        if (isConnected) return mongoose;

        const connection = await mongoose.connect(MONGODB_CONNECTION_URI);
        console.log("DB Connected...");
        isConnected = true;

        defineAllModels();

        return connection;
    } catch (error) {
        console.log("Connection Error");
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Something went wrong to connect DB");
        }
    }
};
