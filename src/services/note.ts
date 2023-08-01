import {NoteService} from "../api/generated/api/resources/note/service/NoteService";
import {CreateNoteResponse, Note} from "../api/generated/api";
import * as e from "express";

export default new NoteService({
    create(req: e.Request<never, CreateNoteResponse, Note, never>, res: {
        send: (responseBody: CreateNoteResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: e.CookieOptions) => void;
        locals: any
    }): void | Promise<void> {
        return undefined;
    }
})
