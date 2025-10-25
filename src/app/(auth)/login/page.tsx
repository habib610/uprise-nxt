import AuthHead from "@/components/auth/AuthHead";
import AuthInfo from "@/components/auth/AuthInfo";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
    return (
        <section className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="auth-card">
                <AuthHead
                    title="Log In"
                    subtitle="Enter your email and password to continue learning"
                />
                <LoginForm />
                <AuthInfo isNewUser={false} />
            </div>
        </section>
    );
};

export default LoginPage;
