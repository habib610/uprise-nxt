import { IMAGES } from "@/assets";
import {
    HOME,
    LOGIN,
    NAV_LINKS,
    NAV_PROTECTED_LINKS,
} from "@/constants/appConstants";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../auth";
import Hamburger from "./Hamburger";
import Logout from "./auth/Logout";

const Navbar = async ({ authPage }: { authPage: boolean }) => {
    const session = await auth();

    const links = session ? [...NAV_LINKS, ...NAV_PROTECTED_LINKS] : NAV_LINKS;

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/20 shadow-md ">
            <div className="container mx-auto flex justify-between items-center px-6 py-1 md:py-2 relative">
                <Link
                    href={HOME}
                    className="flex items-center space-x-2 relative w-[100px] h-[60px] md:w-[140px] md:h-[70px]"
                >
                    <Image
                        alt="logo"
                        src={IMAGES.logo}
                        fill
                        className="cursor-pointer object-contain"
                    />
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {authPage && (
                        <>
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className="text-primary hover:text-secondary font-medium transition duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {session?.user ? (
                                <div className="flex items-center gap-1">
                                    <span className="mx-1 py-2 bg-primary text-white font-bold rounded-full flex items-center justify-center text-center px-2 h-[30px] w-[30px] text-2xl">
                                        {session.user.name?.charAt(0)}
                                    </span>{" "}
                                    |{" "}
                                    <span>
                                        <Logout />
                                    </span>
                                </div>
                            ) : (
                                <Link className="btn-primary" href={LOGIN}>
                                    Login
                                </Link>
                            )}
                        </>
                    )}
                </nav>
                <SessionProvider>
                    <Hamburger />
                </SessionProvider>
            </div>
        </header>
    );
};

export default Navbar;
