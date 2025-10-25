import cn from "@/lib/cn";
import { CreditCardType } from "@/types/dashboard";
import { IoArrowUpCircle } from "react-icons/io5";

const CreditCard = ({
    title,
    subTitle,
    value,
    icon: Icon,
    className,
}: CreditCardType) => {
    return (
        <div className="flex justify-center">
            <div
                className={cn(
                    "h-[200px] shadow-md bg-linear-to-br from-gray-600  rounded-xl p-4 flex flex-col justify-between",
                    className
                )}
            >
                <div className="flex items-center justify-between w-[250px] 2xl:w-[300px]">
                    <p className="text-white">{title}</p>
                    {Icon ? (
                        <Icon className="text-white" />
                    ) : (
                        <IoArrowUpCircle className="text-white" size={24} />
                    )}
                </div>
                <h1 className="h1 text-white text-8xl font-semibold">
                    {value}
                </h1>
                <p className="text-sm">{subTitle}</p>
            </div>
        </div>
    );
};

export default CreditCard;
