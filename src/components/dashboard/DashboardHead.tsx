import { HOST } from "@/constants/appConstants";
import { MdContentCopy } from "react-icons/md";

const DashboardHead = ({ code }: { code: string }) => {
    const inviteLink = `${HOST}/registration?r=${code}`;
    return (
        <div className="bg-gray-50 py-4 px-2 lg:px-4 rounded-2xl flex justify-between items-center mb-4 lg:mb-6 lg:mx-4 flex-wrap gap-4 border border-gray-100">
            <div className="flex-1">
                <h2 className="font-semibold text-2xl lg:text-3xl text-gray-800">
                    Dashboard
                </h2>
                <p className="text-gray-700 mt-0.5">
                    You can earn credits by sharing your code to a friend
                </p>
            </div>
            <div className="flex items-center gap-2">
                <div className=" flex flex-wrap  items-center gap-2 ">
                    <div className="flex items-center gap-2 gap-y-0.5 flex-wrap">
                        <span className="text-black">Invite link</span>
                        <span className="text-amber-500 font-bold">
                            {inviteLink}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-700 py-2 border border-gray-200 px-4 rounded-xl bg-blue-50 gap-2  hover:cursor-pointer">
                        <MdContentCopy size={24} />{" "}
                        <span className="text-sm md:text-bse">Copy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHead;
