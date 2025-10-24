import crypto from "crypto";

export const generateReferralCode = (name: string): string => {
    const prefix = name.replace(/\s+/g, "").toUpperCase().slice(0, 2);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code: string = "";
    const bytes = crypto.randomBytes(4);

    for (let i: number = 0; i < 4; i++) {
        code += chars[bytes[i] % chars.length];
    }
    return `${prefix}${code}`;
};
