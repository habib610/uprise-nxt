import { CourseTagType } from "@/types/course";

const CourseTag = ({ value, icon: Icon, subtitle }: CourseTagType) => {
    return (
        <div className="bg-gray-100 rounded px-2 py-0.5 text-sm text-gray-700 inline-flex items-center gap-1 ">
            {Icon && <Icon size={20} />}
            <div className="flex gap-1">
                {value} {<span>{subtitle}</span>}
            </div>
        </div>
    );
};

export default CourseTag;
