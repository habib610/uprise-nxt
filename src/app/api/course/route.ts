import { connectMongoDB } from "@/services/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        console.log(req.body);
        await connectMongoDB();

        return new NextResponse("User Has been created", {
            status: 201,
        });
    } catch (error) {
        if (error instanceof Error) console.error("Error fetching users:");

        return new Response("Something went wrong", { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        console.log(req.body);
        await connectMongoDB();

        return new NextResponse("User Has been created", {
            status: 201,
        });
    } catch (error) {
        if (error instanceof Error) console.error("Error fetching users:");

        return new Response("Something went wrong", { status: 500 });
    }
};
