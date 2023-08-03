/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as RespondIoApi from "../../..";
import express from "express";
export interface NoteServiceMethods {
    create(req: express.Request<never, RespondIoApi.NoteObject, RespondIoApi.CreateNoteRequest, never>, res: {
        send: (responseBody: RespondIoApi.NoteObject) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    all(req: express.Request<never, RespondIoApi.NoteObject[], never, never>, res: {
        send: (responseBody: RespondIoApi.NoteObject[]) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    single(req: express.Request<{
        noteId: number;
    }, RespondIoApi.NoteObject, never, never>, res: {
        send: (responseBody: RespondIoApi.NoteObject) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    update(req: express.Request<{
        noteId: number;
    }, RespondIoApi.MessageOk, RespondIoApi.UpdateNoteRequest, never>, res: {
        send: (responseBody: RespondIoApi.MessageOk) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    delete(req: express.Request<{
        noteId: number;
    }, RespondIoApi.MessageOk, never, never>, res: {
        send: (responseBody: RespondIoApi.MessageOk) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class NoteService {
    private readonly methods;
    private router;
    constructor(methods: NoteServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}