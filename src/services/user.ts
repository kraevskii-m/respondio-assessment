import {UserService} from "../api/generated/api/resources/user/service/UserService";
import {LoginUserRequest, MessageOk, RegisterUserRequest, TokenResponse} from "../api/generated/api";
import * as e from "express";
import validate from "deep-email-validator";
import {BadRequestError} from "../api/generated/api";

export default new UserService({
    async login(req: e.Request<never, TokenResponse, LoginUserRequest, never>, res: {
        send: (responseBody: TokenResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): Promise<void> {
        return undefined;
    },
    async register(req: e.Request<never, MessageOk, RegisterUserRequest, never>, res: {
        send: (responseBody: MessageOk) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): Promise<void> {
        const {valid} = await validate(req.body.email)
        if (!valid) {
            throw new BadRequestError()
        }

        await res.send({success: true})
    }
})
