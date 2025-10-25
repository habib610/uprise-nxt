"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { LOGIN } from "@/constants/appConstants";
import { redirect } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";

const CoursePayment = ({
    courseId,
    price,
    title,
    isLoggedIn,
}: {
    courseId: string;
    title: string;
    price: number;
    isLoggedIn: boolean;
}) => {
    const formAction = async (data: FormData) => {
        if (!isLoggedIn) {
            redirect(LOGIN);
        }
        const { url } = await createCheckoutSession(data);
        window.location.assign(url || "");
    };
    return (
        <form action={formAction} className="w-full flex justify-center">
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="price" value={price} />
            <input type="hidden" name="title" value={title} />
            <button type="submit" className="btn-primary w-full md:w-3/5">
                Get Now <BsArrowRight size={24} />
            </button>
        </form>
    );
};

export default CoursePayment;
