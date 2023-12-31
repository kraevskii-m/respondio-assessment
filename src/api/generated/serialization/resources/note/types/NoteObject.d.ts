/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as RespondIoApi from "../../../../api";
import * as core from "../../../../core";
export declare const NoteObject: core.serialization.ObjectSchema<serializers.NoteObject.Raw, RespondIoApi.NoteObject>;
export declare namespace NoteObject {
    interface Raw {
        id: number;
        title: string;
        text: string;
        noteType: serializers.NoteType.Raw;
    }
}
