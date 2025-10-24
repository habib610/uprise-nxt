"use server";

import { signIn } from "../../../auth";

export const loginWithEmailAndPassword = async (formData: FormData) => {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        return response;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        throw new Error("Invalid credentials");
    }
};
