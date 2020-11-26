/**
 * Print files.
 */
import {serialize} from "../../app/utils/serialize";
import type {GoogleFileMeta} from "../../app/types";
import {info} from "../Flashes/flashes";
import GoogleAuth = gapi.auth2.GoogleAuth;
import GDrive from "./GDrive";

export const listFiles = async (searchTerm: string | null = null): Promise<GoogleFileMeta[]> => {
    info(`searching ${searchTerm}`);
    const response: gapi.client.Response<gapi.client.drive.FileList> = await gapi.client.drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime, webContentLink)',
        q: searchTerm,
    });
    return <GoogleFileMeta[]>response.result.files;
};


export const upload = async (fileName: string, data: object) => {
    const jsonData = serialize(data);
    const boundary = 'foo_bar_baz'
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    let fileData = jsonData;
    let contentType = 'application/json';
    let metadata = {
        'name': fileName,
        'mimeType': contentType
    };
    let multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        fileData + '\r\n' +
        close_delim;
    await gapi.client.request({
        'path': 'https://www.googleapis.com/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
            'Content-Type': 'multipart/related; boundary=' + boundary + ''
        },
        'body': multipartRequestBody
    });
}


export const download = async (url: string): Promise<object> => {
    const token = gapi.client.getToken();
    console.log({token});
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token.access_token}`,
            //'Accept': 'application/json',
            //'Access-Control-Allow-Origin': '*'
        })
    });
    console.log(response);
    return response.json();
};

export const getMeta = async (record: GoogleFileMeta): Promise<gapi.client.drive.File> => {
    const request = await gapi.client.drive.files.get({fileId: record.id});
    const file = request.result;
    console.log(request);
    console.log(request.result);
    console.log('Title: ' + file.name);
    console.log('Description: ' + file.description);
    console.log('MIME type: ' + file.mimeType);
    return file;
}