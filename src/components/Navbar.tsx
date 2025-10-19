import { IMAGES } from "@/assets";
import { HOME, LOGIN, NAV_LINKS } from "@/constants/appConstants";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";

const Navbar = ({ authPage }: { authPage: boolean }) => {
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
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className="text-primary hover:text-secondary font-medium transition duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link className="btn-primary" href={LOGIN}>
                                Login
                            </Link>
                        </>
                    )}
                </nav>

                <Hamburger />
            </div>
        </header>
    );
};

export default Navbar;
