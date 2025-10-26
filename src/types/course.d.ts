export interface InstructorType {
    name: string;
    avatar?: string;
    email?: string;
}

export type Rating = {
    rate: number | undefined;
};

export interface CoursesCardDataType {
    _id: string;
    title: string;
    category: string;
    thumbnail: string;
    price: number;
    discount?: number;
    duration: number;
    rating?: Rating;
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

export interface PopulatedRating {
    rate?: number;
}
export interface PopulatedInstructor {
    name: string;
    email: string;
    avatar: string;
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

export interface PopulatedCourse {
    title: string;
    category: string;
    thumbnail: string;
    duration: number;
    price: number;
}
