import { IMAGES } from "@/assets";
import Image from "next/image";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import ImageFloatingBox from "./ImageFloatingBox";

const HeroImage = () => {
    return (
        <div className="relative ">
            <Image
                alt="boy with books"
                width={600}
                height={900}
                src={IMAGES.bannerImage}
                // fill
            />
            <ImageFloatingBox
                subtitle="Professional Instructor"
                title="60+"
                className="top-2/5 right-8/12"
                icon={FaChalkboardTeacher}
                iconClass="bg-rose-500"
            />
            <ImageFloatingBox
                subtitle="Assisted Student"
                title="200+"
                className="top-8/12 right-4/5"
                icon={FaUsersRectangle}
                iconClass="bg-purple-400"
            />
            <ImageFloatingBox
                subtitle="Your enrollment completed"
                title="Congratulation"
                className="top-4/12 left-8/12"
                icon={FiMail}
                titleClass="text-lg "
                iconClass="bg-green-400"
            />
        </div>
    );
};

export default HeroImage;
