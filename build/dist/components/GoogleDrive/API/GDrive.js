import Files2 from "./Files.js";
import Permissions2 from "./Permissions.js";
import About2 from "./About.js";
import {ArrayStringifier, StaticUtils} from "../../../../web_modules/simple-common-utils.js";
const GDrive2 = class {
  static init(params = {files: {}}) {
    GDrive2.files = new Files2(params.files);
    GDrive2.permissions = new Permissions2();
    GDrive2.about = new About2();
  }
  static setAccessToken(accessToken) {
    GDrive2.accessToken = accessToken;
  }
  static isInitialized() {
    return !!GDrive2.accessToken;
  }
  static createHeaders(contentType, contentLength, ...additionalPairs) {
    const rawHeaders = {
      Authorization: `Bearer ${GDrive2.accessToken}`,
      "Content-Type": contentType,
      "Content-Length": contentLength
    };
    return new Headers({...rawHeaders, ...additionalPairs});
  }
  static stringifyQueryParams(queryParams, prefix = "?", separator = "&", quoteIfString) {
    if (!queryParams)
      return "";
    const array = Object.entries(queryParams).map(([key, val]) => `${key}=${StaticUtils.safeQuoteIfString(val, quoteIfString)}`);
    return new ArrayStringifier(array).setPrefix(prefix).setSeparator(separator).process();
  }
};
let GDrive = GDrive2;
GDrive.urlFiles = "https://www.googleapis.com/drive/v3/files";
GDrive.urlAbout = "https://www.googleapis.com/drive/v3/about";
GDrive.contentTypeJson = "application/json; charset=UTF-8";
export default GDrive;
