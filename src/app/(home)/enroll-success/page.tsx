import { COURSES } from "@/constants/appConstants";
import { getCourseById } from "@/lib/api/course";
import { stripe } from "@/lib/stripe";
import { CoursesDataType, EnrollSuccessParams } from "@/types/course";
import Link from "next/link";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const EnrollSuccessPage = async ({
    searchParams: { session_id, courseId },
}: EnrollSuccessParams) => {
    console.log(courseId);
    console.log(session_id);
    if (!session_id) {
        throw new Error("Session id is invalid");
    }

    /* @TODO => get user details @habib610 Fri October 24,2025 */
    const course: CoursesDataType = await getCourseById(courseId);
    /* @TODO => get user details @habib610 Fri October 24,2025 */

    const checkoutSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ["line_items", "payment_intent"],
        }
    );
    const paymentStatus: string = checkoutSession.payment_status;
    if (paymentStatus === "succeeded") {
        /* @TODO => update db @habib610 Fri October 24,2025 */
    }

    return (
        <section className="min-h-screen pt-25 flex items-center justify-center ">
            <div className="mx-4  flex flex-col items-center border border-gray-200 py-8 rounded-2xl px-2 md:px-3 lg:px-4 max-w-[700px] gap-5">
                <IoCheckmarkCircleSharp className="text-green-500 text-7xl lg:text-7xl   xl:text-9xl outline-2 outline-offset-2 rounded-full" />
                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                    Congratulation
                </h1>
                <h2 className="text-center">
                    Your enrollment has been successful for{" "}
                    <Link
                        href={`${COURSES}/${courseId}`}
                        className="font-bold text-primary underline"
                    >
                        {course.title}
                    </Link>
                </h2>
                <Link href={COURSES} className="btn-primary">
                    Explore More
                </Link>
            </div>
        </section>
    );
};

export default EnrollSuccessPage;
