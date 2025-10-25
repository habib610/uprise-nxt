import { userModel } from "@/model/user-model";
import { EmailAndPasswordData } from "@/types/auth";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const creds = credentials as EmailAndPasswordData;

                if (!creds?.email || !creds?.password) {
                    throw new Error("Email or password is missing");
                }

                try {
                    const user = await userModel.findOne({
                        email: creds.email,
                    });
                    if (!user) {
                        throw new Error("User not found");
                    }

                    const isMatch = await bcrypt.compare(
                        creds.password,
                        user.password
                    );
                    if (!isMatch) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    throw new Error(
                        error instanceof Error
                            ? error.message
                            : "Login error! try again later"
                    );
                }
            },
        }),
    ],
});
