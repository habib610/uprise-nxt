"use client";
import { loginWithEmailAndPassword } from "@/app/actions";
import { COURSES } from "@/constants/appConstants";
import { EmailAndPasswordData, ValidationErrors } from "@/types/auth";
import { validateLogin } from "@/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Input from "../ui/Input";

const LoginForm = () => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loginError, setLoginError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError("");
        const form = e.currentTarget;

        const formData = new FormData(e.currentTarget);
        try {
            const data: EmailAndPasswordData = {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            };

            const validationErrors = validateLogin(data);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                setLoading(true);
                const response = await loginWithEmailAndPassword(formData);
                form.reset();

                if (!!response.error) {
                    setLoginError(response.error);
                } else {
                    setLoading(false);
                    router.push(COURSES);
                }
            }
        } catch (error) {
            setLoading(false);
            setLoginError(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    };
    return (
        <div>
            {loginError && (
                <div className="my-4 text-red-500">{loginError}</div>
            )}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                action=""
            >
                <Input
                    placeholder="email"
                    name="email"
                    id="email"
                    type="text"
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
                <button
                    disabled={loading}
                    className="btn-primary flex items-center disabled:bg-gray-500"
                >
                    Login{" "}
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

export default LoginForm;
