import * as crypto from "crypto";

export const generateSalt = (): string => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0.16);
};

export const sha512 = (password: string, salt: string): { salt: string, hash: string } => {
    let hmac = crypto.createHmac("sha512", salt);
    hmac.update(password);
    const hash = hmac.digest("hex");
    return {
        salt,
        hash,
    };
};

export const validatePassword = (checkingPassword: string,
                                 hash: string,
                                 salt: string) => {
    const saltPassword = sha512(checkingPassword, salt)
    return hash === saltPassword.hash;
}
