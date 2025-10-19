"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { BsArrowRight } from "react-icons/bs";

const CoursePayment = () => {
    const formAction = async () => {
        const { url } = await createCheckoutSession();
        window.location.assign(url || "");
    };
    return (
        <form action={formAction} className="w-full flex justify-center">
            <button type="submit" className="btn-primary w-full md:w-3/5">
                Get Now <BsArrowRight size={24} />
            </button>
        </form>
    );
};

export default CoursePayment;
