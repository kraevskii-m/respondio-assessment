import * as crypto from "crypto";
import {Forbidden, ServerError} from "../api/generated/api";
import * as jwt from "jsonwebtoken";

export interface Payload {
    _id: string;
    name: string;
}

const secretKey = (): string => {
    const env_key = process.env.SECRET_KEY
    if (!env_key) {
        throw new ServerError()
    }
    return env_key
}
export const generateSalt = (length: number): string => {
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

export const generateToken = (payload: object) =>
    jwt.sign(payload, secretKey(), {
        expiresIn: '30 days',
    });

export const decodeToken = (authorization?: string): {id: number, email: string} => {
    const token = authorization?.replace('Bearer ', '');
    if (!token) {
        throw new Forbidden()
    }
    let decoded
    try {
        decoded = jwt.verify(token, secretKey());
        const payload = decoded as Payload
        return {id: parseInt(payload._id), email: payload.name}
    } catch (err) {
        throw new Forbidden()
    }
}
