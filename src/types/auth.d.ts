import mongoose from "mongoose";
import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export interface EmailAndPasswordData {
    email: string;
    password: string;
}
export interface RegistrationData extends EmailAndPasswordData {
    name: string;
    confirmPassword: string;
}

export interface ValidationErrors {
    [key: string]: string;
}

export type AuthHeadData = {
    title: string;
    subtitle: string;
};

export interface NewUserType extends EmailAndPasswordData {
    name: string;
    referralCode?: string;
    referredBy?: mongoose.Schema.Types.ObjectId;
    avatar?: string;
    role?: string;
}
