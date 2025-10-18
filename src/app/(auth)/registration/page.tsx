import AuthInfo from "@/components/auth/AuthInfo";
import Input from "@/components/ui/Input";
import { FormEvent } from "react";

const RegistrationPage = () => {
    const handleSubmit = (e: FormEvent) => {
        console.log(e.currentTarget);
    };
    return (
        <section className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="auth-card">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    action=""
                >
                    <Input
                        placeholder="name"
                        name="name"
                        id="name"
                        type="name"
                        label="Name"
                        required
                        error="Hello"
                    />
                    <Input
                        placeholder="email"
                        name="email"
                        id="email"
                        type="email"
                        label="Email"
                        required
                    />
                    <Input
                        label="Password"
                        placeholder="password"
                        name="password"
                        id="password"
                        type="password"
                        required
                    />
                    <Input
                        label="Confirm Password"
                        placeholder="confirm password"
                        name="confirmPassword"
                        id="confirmPassword"
                        type="confirmPassword"
                        required
                    />
                    <button type="submit" className="btn-primary">
                        Signup
                    </button>
                </form>
                <AuthInfo isNewUser={true} />
            </div>
        </section>
    );
};

export default RegistrationPage;
