import { IconType } from "react-icons";

export interface ImageBox {
    id?: number;
    title: string;
    subtitle: string;
    className?: string;
    icon: IconType;
    titleClass?: string;
    iconClass?: string;
}
