"use client";
import AuthHead from "@/components/auth/AuthHead";
import AuthInfo from "@/components/auth/AuthInfo";
import Input from "@/components/ui/Input";
import { EmailAndPasswordData, ValidationErrors } from "@/types/auth";
import { validateLogin } from "@/utils";
import { FormEvent, useState } from "react";

const LoginPage = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: EmailAndPasswordData = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        const validationErrors = validateLogin(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
        }
    };
    return (
        <section className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="auth-card">
                <AuthHead
                    title="Log In"
                    subtitle="Enter your email and password to continue learning"
                />
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    action=""
                >
                    <Input
                        placeholder="email"
                        name="email"
                        id="email"
                        type="email"
                        label="Email"
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        placeholder="password"
                        name="password"
                        id="password"
                        type="password"
                        error={errors.password}
                    />
                    <button className="btn-primary">Login</button>
                </form>
                <AuthInfo isNewUser={false} />
            </div>
        </section>
    );
};

export default LoginPage;
