import { IMAGES } from "@/assets";
import { CoursesDataType } from "@/types/course";

export const courses: CoursesDataType[] = [
    {
        id: "1",
        title: "[2025 Practice Exam]AWS Certified Solution Architect SAA-C03",
        description:
            "The AWS Certified Solutions Architect - Associate (SAA-C03)  practice exam is intended for individuals who are planning to take the exam and get certified.  The Practice exam contains 325 unique high-quality real exam like test questions+detailed explanations and validates a individuals’s ability to complete the following tasks: \nThe exam validates a candidate’s ability to design solutions based on the AWS Well-Architected Framework. Design solutions that incorporate AWS services to meet current business requirements and future projected needs \nDesign architectures that are secure, resilient, high-performing, and cost optimized \n Review existing solutions and determine improvements",
        subtitle:
            "Pass AWS Certified Solutions Architect SAA-C03 exam in first attempt. 325 unique high-quality test questions+explanation ",
        category: "Software",
        enrolled: 50,
        instructor: {
            name: "Cloudoku",
            avatar: IMAGES.instructor,
        },
        thumbnail: IMAGES.courseThumbnail,
        price: 120,
        discount: 10,
        duration: 120,
        rating: 4,
    },
    {
        id: "2",
        title: "[2025 Practice Exam]AWS Certified Solution Architect SAA-C03",
        description:
            "The AWS Certified Solutions Architect - Associate (SAA-C03)  practice exam is intended for individuals who are planning to take the exam and get certified.  The Practice exam contains 325 unique high-quality real exam like test questions+detailed explanations and validates a individuals’s ability to complete the following tasks: \nThe exam validates a candidate’s ability to design solutions based on the AWS Well-Architected Framework. Design solutions that incorporate AWS services to meet current business requirements and future projected needs \nDesign architectures that are secure, resilient, high-performing, and cost optimized \n Review existing solutions and determine improvements",
        subtitle:
            "Pass AWS Certified Solutions Architect SAA-C03 exam in first attempt. 325 unique high-quality test questions+explanation ",
        category: "Software",
        enrolled: 50,
        instructor: {
            name: "Cloudoku",
            avatar: IMAGES.instructor,
        },
        thumbnail: IMAGES.courseThumbnail,
        price: 120,
        discount: 0,
        duration: 120,
        rating: 4,
    },
];
