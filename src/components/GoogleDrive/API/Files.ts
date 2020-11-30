import utf8 from "utf8";
import {StaticUtils} from "simple-common-utils";
import GDrive from "./GDrive";

const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";

export default class Files {
	static mimeFolder = "application/vnd.google-apps.folder";
	private readonly params = {
		boundary: "foo_bar_baz"
	};

	constructor(params = {}) {
		Object.assign(this.params, params);
	}

	createFileMultipart(media: any, mediaType: string, metadata?: Object, isBase64 = false) {
		const body = this.createRequestBody(media, mediaType, metadata, isBase64);
		return fetch(
			`${uploadUrl}?uploadType=multipart`, {
				method: "POST",
				headers: GDrive.createHeaders(
					`multipart/related; boundary=${this.params.boundary}`,
					body.length
				),
				body
			});
	}

	delete(fileId) {
		return fetch(`${GDrive.urlFiles}/${fileId}`, {
			method: "DELETE",
			headers: GDrive.createHeaders()
		});
	}

	async safeCreateFolder(metadata) {
		let id = await this.getId(metadata.name, metadata.parents, Files.mimeFolder);

		if (!id) {
			metadata.mimeType = Files.mimeFolder;

			const body = JSON.stringify(metadata);

			const result = await fetch(GDrive.urlFiles, {
				method: "POST",
				headers: GDrive.createHeaders(
					GDrive.contentTypeJson,
					body.length),
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
		const queryParams = {name, trashed, mimeType: undefined};

		if (mimeType) {
			queryParams.mimeType = mimeType;
		}

		let result = await this.list({
			q: GDrive.stringifyQueryParams(queryParams, "",
				" and ", true) + ` and '${parents[0]}' in parents`
		});

		if (!result.ok) {
			throw result;
		}

		const file = (await result.json()).files[0];

		return file ? file.id : file;
	}

	get(fileId, queryParams) {
		const parameters = GDrive.stringifyQueryParams(queryParams);
		return fetch(`${GDrive.urlFiles}/${fileId}${parameters}`, {
			headers: GDrive.createHeaders()
		});
	}

	download(fileId, downloadFileOptions: RequestInit = {}, queryParams = {alt: undefined}) {
		queryParams.alt = "media";
		const parameters = GDrive.stringifyQueryParams(queryParams);
		downloadFileOptions.headers = Object.assign({
			"Authorization": `Bearer ${GDrive.accessToken}`
		}, downloadFileOptions.headers);
		return fetch(`${GDrive.urlFiles}/${fileId}${parameters}`, downloadFileOptions);
	}

	search(q: string, pageSize = 10) {
		return this.list({q}, pageSize);
	}

	list(queryParams, pageSize = 10) {
		const fields = 'nextPageToken, files(id, name, mimeType, modifiedTime, webContentLink)';
		return fetch(`${GDrive.urlFiles}${GDrive.stringifyQueryParams({...queryParams, pageSize, fields})}`, {
			headers: GDrive.createHeaders()
		});
	}

	updateMetadata(fileId: string, metadata: object, queryParams: Record<string, any> = {}) {
		queryParams.uploadType = 'media';
		let config = {
			headers: GDrive.createHeaders('application/json'),
			method: 'PATCH',
			body: JSON.stringify(metadata)
		};
		return fetch(`${GDrive.urlFiles}/${fileId}${GDrive.stringifyQueryParams(queryParams)}`, config);
	}

	createRequestBody(media: any, mediaType: string, metadata?: Object, isBase64 = false) {
		const ddb = `--${this.params.boundary}`;
		const ending = `\n${ddb}--`;
		let body: string | Uint8Array = `\n${ddb}\n` +
			`Content-Type: ${GDrive.contentTypeJson}\n\n` +
			`${JSON.stringify(metadata)}\n\n${ddb}\n` +
			(isBase64 ? "Content-Transfer-Encoding: base64\n" : '') +
			`Content-Type: ${mediaType}\n\n`;
		if (media.constructor == String) {
			body += `${media}${ending}`;
		} else {
			body = new Uint8Array(
				StaticUtils.encodedUtf8ToByteArray(utf8.encode(body))
					.concat(media)
					.concat(StaticUtils.encodedUtf8ToByteArray(utf8.encode(ending))));
		}
		return body;
	}

	updateFile(fileId: string, media: any, mediaType: string, metadata?: Object, isBase64 = false) {
		const body = this.createRequestBody(media, mediaType, metadata, isBase64);
		return fetch(
			`${uploadUrl}/${fileId}?uploadType=multipart`, {
				method: "PATCH",
				headers: GDrive.createHeaders(
					`multipart/related; boundary=${this.params.boundary}`,
					body.length
				),
				body
			});
	}

	export(fileId, mimeType) {
		return fetch(`${GDrive.urlFiles}/${fileId}/export?mimeType=${mimeType}`, {
			headers: GDrive.createHeaders()
		});
	}
}
