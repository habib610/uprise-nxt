import Navbar from "@/components/Navbar";
import { connectMongoDB } from "@/services/mongodb";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../styles/globals.css";

const geistSans = localFont({
    src: "../../assets/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "UP Rising",
    description: "An online education platform",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await connectMongoDB();
    return (
        <html lang="en">
            <head>
                <link
                    rel="shortcut icon"
                    href="favicon.svg"
                    type="image/x-icon"
                />
            </head>
            <body className={`${geistSans.variable} antialiased `}>
                <Navbar authPage={false} />
                <main>{children}</main>
            </body>
        </html>
    );
}
