/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as RespondIoApi from "../../../../api";
import * as core from "../../../../core";
export declare const UpdateNoteRequest: core.serialization.ObjectSchema<serializers.UpdateNoteRequest.Raw, RespondIoApi.UpdateNoteRequest>;
export declare namespace UpdateNoteRequest {
    interface Raw {
        title?: string | null;
        text?: string | null;
        noteType?: serializers.NoteType.Raw | null;
    }
}
