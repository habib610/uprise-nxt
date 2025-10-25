"use client";

import { HOST } from "@/constants/appConstants";
import { useState } from "react";
import { MdCheckCircle, MdContentCopy } from "react-icons/md";

const DashboardHead = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);
    const inviteLink = `${HOST}/registration?r=${code}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="bg-gray-50 py-4 px-2 lg:px-4 rounded-2xl flex justify-between items-center mb-4 lg:mb-6 lg:mx-4 flex-wrap gap-4 border border-gray-100">
            <div className="flex-1">
                <h2 className="font-semibold text-2xl lg:text-3xl text-gray-800">
                    Dashboard
                </h2>
                <p className="text-gray-700 mt-0.5">
                    You can earn credits by sharing your referral link with
                    friends
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-black">Invite link:</span>
                    <span className="text-amber-500 font-semibold break-all">
                        {inviteLink}
                    </span>
                </div>

                <button
                    onClick={handleCopy}
                    className={`flex items-center text-gray-700 py-2 px-4 border border-gray-200 rounded-xl bg-blue-50 gap-2 hover:bg-blue-100 transition-colors duration-200 hover:cursor-pointer ${
                        copied
                            ? "text-green-600 border-green-300 bg-green-50"
                            : ""
                    }`}
                >
                    {copied ? (
                        <>
                            <MdCheckCircle size={20} />
                            <span className="text-sm font-medium">Copied!</span>
                        </>
                    ) : (
                        <>
                            <MdContentCopy size={20} />
                            <span className="text-sm font-medium">Copy</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DashboardHead;
