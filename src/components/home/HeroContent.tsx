import { REGISTRATION } from "@/constants/appConstants";
import Link from "next/link";

const HeroContent = () => {
    return (
        <div>
            <div className="flex flex-col gap-y-3 md:gap-y-4">
                <h1 className="h1">
                    <span className="text-secondary">Learn</span> Today
                </h1>
                <h1 className="h1">
                    <span className="text-primary">Rise</span> Tomorrow
                </h1>
                <p className=" max-w-10/12 lg:w-auto text-gray-700">
                    An online educational platform to learn new skills and rise
                    up for a better future
                </p>
            </div>
            <Link
                href={REGISTRATION}
                className="btn-primary inline-flex mt-6 lg:mt-9"
            >
                Join for Free
            </Link>
        </div>
    );
};

export default HeroContent;
