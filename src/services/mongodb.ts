import { MONGODB_CONNECTION_URI } from "@/constants/dbConstants";
import mongoose from "mongoose";

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
