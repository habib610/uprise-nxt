export interface InstructorType {
    name: string;
    avatar?: string;
}
export interface CoursesDataType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    enrolled: number;
    instructor: InstructorType;
    thumbnail: string;
    price: number;
    discount: number;
    duration: number;
    rating: number;
}

export type CourseTagType = { value: number | string; icon?: IconType };
