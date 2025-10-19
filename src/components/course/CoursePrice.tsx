import cn from "@/lib/cn";

const CoursePrice = ({
    price,
    discount,
    className,
}: {
    price: number;
    discount: number;
    className?: string;
}) => {
    const finalPrice: number = discount
        ? price - (price * discount) / 100
        : price;

    return (
        <div className={cn("flex items-center gap-2 text-xl", className)}>
            {discount > 0 && (
                <p className="line-through text-gray-400 text-sm">${price}</p>
            )}
            <p className="text-primary font-bold ">${finalPrice}</p>
        </div>
    );
};

export default CoursePrice;
