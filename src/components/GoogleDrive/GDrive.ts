import Files from "./Files";
import Permissions from "./Permissions";
import About from "./About";
import {ArrayStringifier, StaticUtils} from "simple-common-utils";

interface Params {
    files: {
        boundary?: string
    }
}

export default class GDrive {

    static urlFiles = "https://www.googleapis.com/drive/v3/files";
    static urlAbout = "https://www.googleapis.com/drive/v3/about";
    static contentTypeJson = "application/json; charset=UTF-8";
    static files: Files;
    static permissions: Permissions;
    static about: About;
    static accessToken: string;

    static init(params: Params = {files: {}}) {
        GDrive.files = new Files(params.files);
        GDrive.permissions = new Permissions();
        GDrive.about = new About();
    }

    static setAccessToken(accessToken: string): void {
        GDrive.accessToken = accessToken;
    }

    static isInitialized(): boolean {
        return !!GDrive.accessToken;
    }

    static createHeaders(contentType?: string, contentLength?: number, ...additionalPairs) {
        const rawHeaders = {
            "Authorization": `Bearer ${GDrive.accessToken}`,
            "Content-Type": contentType,
            "Content-Length": contentLength,
        }
        return new Headers({...rawHeaders, ...additionalPairs});
    }

    static stringifyQueryParams(queryParams, prefix: string = "?", separator: string = "&", quoteIfString?: boolean) {
        const array = [];

        Object.keys(queryParams).forEach(key => array.push(
            `${key}=${StaticUtils.safeQuoteIfString(queryParams[key], quoteIfString)}`));

        return new ArrayStringifier(array)
            .setPrefix(prefix)
            .setSeparator(separator)
            .process();
    }
}
