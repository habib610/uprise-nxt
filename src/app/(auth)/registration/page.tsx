"use client";
import AuthHead from "@/components/auth/AuthHead";
import AuthInfo from "@/components/auth/AuthInfo";
import Input from "@/components/ui/Input";
import { RegistrationData, ValidationErrors } from "@/types/auth";
import { validateRegistration } from "@/utils";
import { FormEvent, useState } from "react";

const RegistrationPage = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: RegistrationData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        };

        const validationErrors = validateRegistration(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
        }
    };

    return (
        <section className="page-main-section  flex justify-center items-center pt-10">
            <div className="auth-card">
                <AuthHead
                    title="Create Account"
                    subtitle="Create an account to get started  & learn seamless courses"
                />
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <Input
                        placeholder="name"
                        name="name"
                        id="name"
                        type="text"
                        label="Name"
                        error={errors.name}
                    />
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
                    <Input
                        label="Confirm Password"
                        placeholder="confirm password"
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        error={errors.confirmPassword}
                    />
                    <button type="submit" className="btn-primary">
                        Create Account
                    </button>
                </form>
                <AuthInfo isNewUser={true} />
            </div>
        </section>
    );
};

export default RegistrationPage;
