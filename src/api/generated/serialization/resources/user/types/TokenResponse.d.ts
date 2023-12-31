/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as RespondIoApi from "../../../../api";
import * as core from "../../../../core";
export declare const TokenResponse: core.serialization.ObjectSchema<serializers.TokenResponse.Raw, RespondIoApi.TokenResponse>;
export declare namespace TokenResponse {
    interface Raw {
        accessToken: string;
        tokenType: string;
    }
}
