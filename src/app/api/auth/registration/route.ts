import { generateReferralCode } from "@/lib/generateReffCode";
import { referralModel } from "@/model/referral-model";
import { userModel } from "@/model/user-model";
import { connectMongoDB } from "@/services/mongodb";
import { NewUserType } from "@/types/auth";
import { UserSchemaType } from "@/types/schema";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const body = await req.json();

    const refCodeByUser: string = body.referralCode || "";
    let referredUserId: mongoose.Schema.Types.ObjectId | undefined;

    try {
        await connectMongoDB();
        const isUserExistByEmail = await userModel.findOne({
            email: body.email,
        });

        if (isUserExistByEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User is already exist",
                },
                {
                    status: 400,
                }
            );
        }

        if (refCodeByUser !== "") {
            const existingUser = await userModel.findOne({
                referralCode: refCodeByUser,
            });

            if (existingUser && existingUser._id) {
                referredUserId =
                    existingUser._id as mongoose.Schema.Types.ObjectId;
            } else {
                return new NextResponse("Invalid Referral Code", {
                    status: 400,
                });
            }
        }

        let newUserReferralCode = generateReferralCode(body.name);
        while (await userModel.findOne({ referralCode: newUserReferralCode })) {
            newUserReferralCode = generateReferralCode(body.name);
        }

        const hashedPassword: string = await bcrypt.hash(body.password, 5);

        const user: NewUserType = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            referralCode: newUserReferralCode,
            avatar: body?.avatar || null,
        };

        const newUser: UserSchemaType = await userModel.create({
            ...user,
            referredBy: referredUserId ? referredUserId : null,
        });

        if (referredUserId) {
            await referralModel.create({
                isPurchased: false,
                referred: newUser._id,
                referrer: referredUserId,
            });
        }

        return NextResponse.json(
            {
                success: true,
                user: {
                    _id: newUser._id,
                    referralCode: newUser.referralCode,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    avatar: newUser.avatar,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Registration Failed",
            },
            {
                status: 500,
            }
        );
    }
};
