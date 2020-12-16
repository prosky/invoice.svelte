import {serialize as serialize2} from "../../app/utils/serialize.js";
export const listFiles = async (searchTerm = null) => {
  console.debug(`searching "${searchTerm}"`);
  const response = await gapi.client.drive.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name, mimeType, modifiedTime,createdTime, md5Checksum)",
    q: searchTerm
  });
  console.log(response.result.files);
  return response.result.files;
};
export const upload = async (fileName, data) => {
  const jsonData = serialize2(data);
  const boundary = "foo_bar_baz";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  let fileData = jsonData;
  let contentType = "application/json";
  let metadata = {
    name: fileName,
    mimeType: contentType
  };
  let multipartRequestBody = delimiter + "Content-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(metadata) + delimiter + "Content-Type: " + contentType + "\r\n\r\n" + fileData + "\r\n" + close_delim;
  await gapi.client.request({
    path: "https://www.googleapis.com/upload/drive/v3/files",
    method: "POST",
    params: {uploadType: "multipart"},
    headers: {
      "Content-Type": "multipart/related; boundary=" + boundary + ""
    },
    body: multipartRequestBody
  });
};
export const download = async (url) => {
  const token = gapi.client.getToken();
  console.log({token});
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token.access_token}`
    })
  });
  console.log(response);
  return response.json();
};
export const getMeta = async (record) => {
  const request = await gapi.client.drive.files.get({fileId: record.id});
  const file = request.result;
  console.log(request);
  console.log(request.result);
  console.log("Title: " + file.name);
  console.log("Description: " + file.description);
  console.log("MIME type: " + file.mimeType);
  return file;
};
