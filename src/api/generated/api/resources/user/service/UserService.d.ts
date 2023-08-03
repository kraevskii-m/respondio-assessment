/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as RespondIoApi from "../../..";
import express from "express";
export interface UserServiceMethods {
    register(req: express.Request<never, RespondIoApi.MessageOk, RespondIoApi.RegisterUserRequest, never>, res: {
        send: (responseBody: RespondIoApi.MessageOk) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    login(req: express.Request<never, RespondIoApi.TokenResponse, RespondIoApi.LoginUserRequest, never>, res: {
        send: (responseBody: RespondIoApi.TokenResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class UserService {
    private readonly methods;
    private router;
    constructor(methods: UserServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}