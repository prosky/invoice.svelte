import GDrive from "./GDrive";

export default class About {
    get(queryParams) {
        return fetch(`${GDrive.urlAbout}${GDrive.stringifyQueryParams(queryParams)}`, {
            headers: GDrive.createHeaders()
        });
    }
}
