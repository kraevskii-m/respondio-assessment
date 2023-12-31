/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as RespondIoApi from "../../../../api";
import * as core from "../../../../core";
export declare const RegisterUserRequest: core.serialization.ObjectSchema<serializers.RegisterUserRequest.Raw, RespondIoApi.RegisterUserRequest>;
export declare namespace RegisterUserRequest {
    interface Raw {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}
