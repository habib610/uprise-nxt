import { emailRegEx } from "@/constants/regex";
import {
    EmailAndPasswordData,
    RegistrationData,
    ValidationErrors,
} from "@/types/auth";

export const validateRegistration = (
    data: RegistrationData
): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.name.trim()) {
        errors.name = "Name is required";
    } else if (data.name.length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegEx.test(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

export const validateLogin = (data: EmailAndPasswordData): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (emailRegEx.test(data.email)) {
        errors.email = "Invalid email format";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    return errors;
};
