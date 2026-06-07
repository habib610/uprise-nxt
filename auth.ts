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
    // Read secret from common env var names so NextAuth has a signing key. NEXTAUTH_SECRET yesiamusingmysupersecretkey
    // Priority: NEXTAUTH_SECRET, AUTH_SECRET, SECRET_KEY
    secret:
        process.env.NEXTAUTH_SECRET ||
        process.env.AUTH_SECRET ||
        process.env.SECRET_KEY,
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
                        user.password,
                    );
                    if (!isMatch) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: `${user._id}`,
                        name: user.name,
                        email: user.email,
                        image: user.avatar,
                    };
                } catch (error) {
                    throw new Error(
                        error instanceof Error
                            ? error.message
                            : "Login error! try again later",
                    );
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        // async session({ session, token }) {
        //     if (token) {
        //         session.user.id = token.id;
        //     }
        //     return session;
        // },
    },
});
