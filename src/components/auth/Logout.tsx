"use client";
import { signOut } from "next-auth/react";

const Logout = () => {
    return (
        <button
            className="text-secondary hover:cursor-pointer hover:text-blue-600"
            onClick={() => signOut()}
        >
            Logout
        </button>
    );
};

export default Logout;
