import cn from "@/lib/cn";
import { ImageBox } from "@/types/home";

const ImageFloatingBox = ({
    subtitle,
    title,
    className,
    icon: Icon,
    titleClass,
    iconClass,
}: ImageBox) => {
    return (
        <div
            className={cn(
                "px-4 py-2 bg-white border border-gray-100 rounded-lg absolute  flex justify-between  gap-3",
                className
            )}
        >
            <div className="flex justify-center items-center">
                <div
                    className={cn(
                        "flex justify-center items-center p-1 rounded-md bg-primary text-white",
                        iconClass
                    )}
                >
                    <Icon size={23} />
                </div>
            </div>
            <div className="flex flex-col  items-center flex-1">
                <h3
                    className={cn(
                        "text-2xl font-medium text-gray-800",
                        titleClass
                    )}
                >
                    {title}
                </h3>
                <p className="text-nowrap text-xs text-gray-600">{subtitle}</p>
            </div>
        </div>
    );
};

export default ImageFloatingBox;
