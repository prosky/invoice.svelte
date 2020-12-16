import utf82 from "../../../../web_modules/utf8.js";
import {StaticUtils} from "../../../../web_modules/simple-common-utils.js";
import GDrive2 from "./GDrive.js";
const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";
const Files2 = class {
  constructor(params = {}) {
    this.params = {
      boundary: "foo_bar_baz"
    };
    Object.assign(this.params, params);
  }
  createFileMultipart(media, mediaType, metadata, isBase64 = false) {
    const body = this.createRequestBody(media, mediaType, metadata, isBase64);
    return fetch(`${uploadUrl}?uploadType=multipart`, {
      method: "POST",
      headers: GDrive2.createHeaders(`multipart/related; boundary=${this.params.boundary}`, body.length),
      body
    });
  }
  delete(fileId) {
    return fetch(`${GDrive2.urlFiles}/${fileId}`, {
      method: "DELETE",
      headers: GDrive2.createHeaders()
    });
  }
  async safeCreateFolder(metadata) {
    let id = await this.getId(metadata.name, metadata.parents, Files2.mimeFolder);
    if (!id) {
      metadata.mimeType = Files2.mimeFolder;
      const body = JSON.stringify(metadata);
      const result = await fetch(GDrive2.urlFiles, {
        method: "POST",
        headers: GDrive2.createHeaders(GDrive2.contentTypeJson, body.length),
        body
      });
      if (!result.ok) {
        throw result;
      }
      id = (await result.json()).id;
    }
    return id;
  }
  async getId(name, parents, mimeType, trashed = false) {
    const queryParams = {name, trashed, mimeType: void 0};
    if (mimeType) {
      queryParams.mimeType = mimeType;
    }
    let result = await this.list({
      q: GDrive2.stringifyQueryParams(queryParams, "", " and ", true) + ` and '${parents[0]}' in parents`
    });
    if (!result.ok) {
      throw result;
    }
    const file = (await result.json()).files[0];
    return file ? file.id : file;
  }
  get(fileId, queryParams) {
    const parameters = GDrive2.stringifyQueryParams(queryParams);
    return fetch(`${GDrive2.urlFiles}/${fileId}${parameters}`, {
      headers: GDrive2.createHeaders()
    });
  }
  download(fileId, downloadFileOptions = {}, queryParams = {alt: void 0}) {
    queryParams.alt = "media";
    const parameters = GDrive2.stringifyQueryParams(queryParams);
    downloadFileOptions.headers = Object.assign({
      Authorization: `Bearer ${GDrive2.accessToken}`
    }, downloadFileOptions.headers);
    return fetch(`${GDrive2.urlFiles}/${fileId}${parameters}`, downloadFileOptions);
  }
  search(q, pageSize = 10) {
    return this.list({q}, pageSize);
  }
  list(queryParams, pageSize = 10) {
    const fields = "nextPageToken, files(id, name, mimeType, modifiedTime, webContentLink)";
    return fetch(`${GDrive2.urlFiles}${GDrive2.stringifyQueryParams({...queryParams, pageSize, fields})}`, {
      headers: GDrive2.createHeaders()
    });
  }
  updateMetadata(fileId, metadata, queryParams = {}) {
    queryParams.uploadType = "media";
    let config = {
      headers: GDrive2.createHeaders("application/json"),
      method: "PATCH",
      body: JSON.stringify(metadata)
    };
    return fetch(`${GDrive2.urlFiles}/${fileId}${GDrive2.stringifyQueryParams(queryParams)}`, config);
  }
  createRequestBody(media, mediaType, metadata, isBase64 = false) {
    const ddb = `--${this.params.boundary}`;
    const ending = `
${ddb}--`;
    let body = `
${ddb}
Content-Type: ${GDrive2.contentTypeJson}

${JSON.stringify(metadata)}

${ddb}
` + (isBase64 ? "Content-Transfer-Encoding: base64\n" : "") + `Content-Type: ${mediaType}

`;
    if (media.constructor == String) {
      body += `${media}${ending}`;
    } else {
      body = new Uint8Array(StaticUtils.encodedUtf8ToByteArray(utf82.encode(body)).concat(media).concat(StaticUtils.encodedUtf8ToByteArray(utf82.encode(ending))));
    }
    return body;
  }
  updateFile(fileId, media, mediaType, metadata, isBase64 = false) {
    const body = this.createRequestBody(media, mediaType, metadata, isBase64);
    return fetch(`${uploadUrl}/${fileId}?uploadType=multipart`, {
      method: "PATCH",
      headers: GDrive2.createHeaders(`multipart/related; boundary=${this.params.boundary}`, body.length),
      body
    });
  }
  export(fileId, mimeType) {
    return fetch(`${GDrive2.urlFiles}/${fileId}/export?mimeType=${mimeType}`, {
      headers: GDrive2.createHeaders()
    });
  }
};
let Files = Files2;
Files.mimeFolder = "application/vnd.google-apps.folder";
export default Files;
