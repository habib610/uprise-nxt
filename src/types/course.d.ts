export interface InstructorType {
    name: string;
    avatar?: string;
    email?: string;
}

export type Rating = {
    rate: number | null;
};

export interface CoursesCardDataType {
    _id: string;
    title: string;
    category: string;
    thumbnail: string;
    price: number;
    discount?: number;
    duration: number;
    rating?: Rating | undefined;
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
    canEnroll: boolean;
}

export type CourseTagType = {
    value: number | string;
    icon?: IconType;
    subtitle?: string;
};

export type Params = {
    params: {
        courseId: string;
    };
};

export type EnrollSuccessParams = {
    searchParams: {
        session_id: string;
        courseId: string;
    };
};
