"use client";

import { LOGIN, NAV_LINKS } from "@/constants/appConstants";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const [loginSession, setLoginSession] = useState<unknown>(null);

    useEffect(() => {
        setLoginSession(session);
    }, [session]);

    return (
        <>
            <button
                className="md:hidden text-secondary  focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <motion.svg
                    initial={false}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                            isOpen
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16m-4 6h4"
                        }
                    />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeIn" }}
                        className="md:hidden mt-4  absolute inset-x-0 top-[50px]  backdrop-blur-xl bg-white/95 border border-white/30
        rounded-b-2xl shadow-2xl"
                    >
                        <nav className="flex flex-col space-y-2">
                            {NAV_LINKS.map((link, idx) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{
                                        delay: idx * 0.1,
                                        duration: 0.3,
                                    }}
                                >
                                    <Link
                                        href={link.path}
                                        className="block px-4 py-2 hover:bg-rose-800 text-secondary rounded transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{
                                    delay: 4 * 0.1,
                                    duration: 0.3,
                                }}
                            >
                                {!loginSession ? (
                                    <Link
                                        href={LOGIN}
                                        className="btn-primary mx-4 mb-4"
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <Link
                                        href="#"
                                        onClick={() => signOut()}
                                        className="btn-primary bg-transparent text-secondary border border-secondary  mx-4 mb-4"
                                    >
                                        Logout
                                    </Link>
                                )}
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Hamburger;
