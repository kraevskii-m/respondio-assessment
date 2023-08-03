import {UserService} from "../api/generated/api/resources/user/service/UserService";
import {
    LoginUserRequest,
    MessageOk,
    NotFound,
    RegisterUserRequest,
    ServerError,
    TokenResponse, WrongCredentials
} from "../api/generated/api";
import * as e from "express";
import validate from "deep-email-validator";
import {BadRequestError} from "../api/generated/api";
import {User} from "../storage/model/user";
import {ValidationError} from "sequelize";
import {generateSalt, generateToken, sha512, validatePassword} from "./utils";
import 'dotenv/config'

export default new UserService({
    async login(req: e.Request<never, TokenResponse, LoginUserRequest, never>, res: {
        send: (responseBody: TokenResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): Promise<void> {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!user) {
            throw new NotFound()
        }
        const passwordCorrect = validatePassword(req.body.password, user.passwordHash, user.salt)
        if (!passwordCorrect) {
            throw new WrongCredentials()
        }

        const token = generateToken({_id: user.id, name: user.email});

        await res.send({accessToken: token, tokenType: "bearer"})
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
        const password = req.body.password
        const salt = generateSalt(password.length)
        const {hash} = sha512(password, salt)

        try {
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                passwordHash: hash,
                salt
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new BadRequestError()
            }
            throw new ServerError()
        }
        await res.send({success: true})
    }
})
