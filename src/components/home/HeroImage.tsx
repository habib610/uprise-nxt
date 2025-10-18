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
                alt="girls with book"
                width={400}
                height={700}
                src={IMAGES.bannerImage}
                // fill
            />
            <ImageFloatingBox
                subtitle="Professional Instructor"
                title="60+"
                className="top-2/5 right-3/5"
                icon={FaChalkboardTeacher}
            />
            <ImageFloatingBox
                subtitle="Your enrollment completed"
                title="Congratulation"
                className="top-3/5 left-3/5"
                icon={FiMail}
                titleClass="text-xl"
                iconClass="bg-green-400"
            />{" "}
            <ImageFloatingBox
                subtitle="Assisted Student"
                title="200+"
                className="top-3/5 right-3/5"
                icon={FaUsersRectangle}
                iconClass="bg-purple-400"
            />
        </div>
    );
};

export default HeroImage;
