import { AuthHeadData } from "@/types/auth";

const AuthHead = ({ title, subtitle }: AuthHeadData) => {
    return (
        <div className="text-center mb-6">
            <h1 className="text-3xl text-gray-800 font-medium">{title}</h1>
            <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
    );
};

export default AuthHead;
