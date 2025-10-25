"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center container mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button onClick={() => reset()} className="btn-primary">
                Try again
            </button>
        </div>
    );
};

export default Error;
