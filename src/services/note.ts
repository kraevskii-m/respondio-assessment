import {NoteService} from "../api/generated/api/resources/note/service/NoteService";
import {CreateNoteRequest, MessageOk, Note, UpdateNoteRequest} from "../api/generated/api";
import * as e from "express";

export default new NoteService({
    all(req: e.Request<never, Note[], never, never>, res: {
        send: (responseBody: Note[]) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    },
    delete(req: e.Request<{ noteId: number }, MessageOk, never, never>, res: {
        send: (responseBody: MessageOk) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    },
    single(req: e.Request<{ noteId: number }, Note, never, never>, res: {
        send: (responseBody: Note) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    },
    update(req: e.Request<{ noteId: number }, Note, UpdateNoteRequest, never>, res: {
        send: (responseBody: Note) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    },
    create(req: e.Request<never, Note, CreateNoteRequest, never>, res: {
        send: (responseBody: Note) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    }
})
