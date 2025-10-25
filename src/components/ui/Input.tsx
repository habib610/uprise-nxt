import cn from "@/lib/cn";
import { InputProps } from "@/types/auth";

const Input = ({ label, error, id, ...rest }: InputProps) => {
    return (
        <div
            className={cn(
                "w-full relative rounded-md outline-0 border-2 border-gray-200 focus-within:border-secondary ease-linear duration-300",
                {
                    "border-red-500 focus-within:border-red-500": error,
                }
            )}
        >
            <label
                htmlFor={id}
                className="absolute bg-white px-2 -top-3 left-3 text-sm text-gray-900"
            >
                {label}
            </label>
            <input
                id={id}
                className={cn(
                    "w-full h-full py-4 px-3 placeholder:text-transparent focus:placeholder:text-gray-400 focus:outline-none bg-transparent disabled:bg-gray-100"
                )}
                {...rest}
            />
            {error && (
                <p className="absolute bottom-[-20px] left-3 text-xs text-red-500 ">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
