/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as RespondIoApi from "../../../../api";
import * as core from "../../../../core";
export declare const MessageOk: core.serialization.ObjectSchema<serializers.MessageOk.Raw, RespondIoApi.MessageOk>;
export declare namespace MessageOk {
    interface Raw {
        success: boolean;
    }
}
