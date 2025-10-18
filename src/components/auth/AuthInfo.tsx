import { LOGIN, REGISTRATION } from "@/constants/appConstants";
import Link from "next/link";

const AuthInfo = ({ isNewUser }: { isNewUser: boolean }) => {
    const message: string = isNewUser
        ? `Already have account?`
        : `Don't have account?`;
    const link: string = isNewUser ? LOGIN : REGISTRATION;
    const pageName: string = isNewUser ? "Login" : "Registration";

    return (
        <div className="text-center mt-4 text-gray-600 ">
            <span className="mr-1"> {message}</span>
            <Link className="underline text-secondary" href={link}>
                {pageName}
            </Link>{" "}
        </div>
    );
};

export default AuthInfo;
