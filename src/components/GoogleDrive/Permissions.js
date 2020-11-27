import GDrive from "./GDrive";

const permissions = "/permissions";

export default class Permissions {
   create(fileId, params, queryParams) {
      const body = JSON.stringify(params);

      queryParams = queryParams ? GDrive.stringifyQueryParams(queryParams) : "";

      return fetch(`${GDrive.urlFiles}/${fileId}${permissions}${queryParams}`, {
         method: "POST",
         headers: GDrive.createHeaders(
            GDrive.contentTypeJson,
            body.length
         ),
         body
      });
   }
   
   delete(fileId, permissionId) {
      return fetch(`${GDrive.urlFiles}/${fileId}${permissions}/${permissionId}`, {
         method: `DELETE`,
         headers: GDrive.createHeaders()
      });
   }
}
