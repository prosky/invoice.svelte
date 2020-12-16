import GDrive2 from "./GDrive.js";
export default class About {
  get(queryParams) {
    return fetch(`${GDrive2.urlAbout}${GDrive2.stringifyQueryParams(queryParams)}`, {
      headers: GDrive2.createHeaders()
    });
  }
}
