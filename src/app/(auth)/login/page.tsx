import AuthInfo from "@/components/auth/AuthInfo";
import Input from "@/components/ui/Input";

const LoginPage = () => {
    return (
        <section className="container mx-auto min-h-screen flex justify-center items-center">
            <div className="auth-card">
                <form className="flex flex-col gap-6" action="">
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
                    <button className="btn-primary">Login</button>
                </form>
                <AuthInfo isNewUser={false} />
            </div>
        </section>
    );
};

export default LoginPage;
