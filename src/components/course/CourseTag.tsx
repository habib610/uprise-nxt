import { CourseTagType } from "@/types/course";

const CourseTag = ({ value, icon: Icon }: CourseTagType) => {
    return (
        <div className="bg-gray-100 rounded px-2 py-0.5 text-sm text-gray-700 inline-flex items-center gap-1 ">
            {Icon && <Icon size={20} />}
            <p>{value}</p>
        </div>
    );
};

export default CourseTag;
