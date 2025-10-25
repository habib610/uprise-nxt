"use client";

import { LOGIN, REGISTRATION_API_ENDPOINT } from "@/constants/appConstants";
import {
    RegistrationData,
    RegistrationFormSubmitDataType,
    ValidationErrors,
} from "@/types/auth";
import { validateRegistration } from "@/utils";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Input from "../ui/Input";

const RegistrationForm = ({ r }: { r?: string }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (success) setSuccess("");
        if (error) setError("");
        const form = e.currentTarget;

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
            try {
                setLoading(true);
                const body: RegistrationFormSubmitDataType = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                };

                if (r) body.referralCode = r;

                const res = await fetch(REGISTRATION_API_ENDPOINT, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(body),
                });
                if (!res.ok) {
                    const data = await res.json();
                    const message =
                        data.message ||
                        "Something went wrong! please try again";
                    setError(message);
                } else {
                    form.reset();

                    setSuccess("Your account has been created successfully");
                    redirect(LOGIN);
                }
                setLoading(false);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
                setLoading(false);
            }
        }
    };
    return (
        <div>
            {error && <div className="text-red-500 my-4">{error}</div>}

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
                <button
                    disabled={loading}
                    type="submit"
                    className="btn-primary disabled:bg-gray-500"
                >
                    Create Account
                    {loading && (
                        <AiOutlineLoading3Quarters
                            size={20}
                            className="animate-spin ease-in-out"
                        />
                    )}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
