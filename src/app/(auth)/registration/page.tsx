import AuthHead from "@/components/auth/AuthHead";
import AuthInfo from "@/components/auth/AuthInfo";
import RegistrationForm from "@/components/auth/RegistrationForm";
import { checkIfAlreadyLoggedIn } from "@/lib/auth";

type RegistrationParamsType = {
    searchParams: {
        r?: string;
    };
};
const RegistrationPage = async ({
    searchParams: { r },
}: RegistrationParamsType) => {
    await checkIfAlreadyLoggedIn();

    return (
        <section className="page-main-section  flex justify-center items-center pt-10">
            <div className="auth-card">
                <AuthHead
                    title="Create Account"
                    subtitle="Create an account to get started  & learn seamless courses"
                />
                <RegistrationForm r={r} />
                <AuthInfo isNewUser={true} />
            </div>
        </section>
    );
};

export default RegistrationPage;
