export type Formatter = (number: number, sign?: boolean) => string;
export interface GoogleFileMeta {
    id: string
    name: string
    mimeType: string
    modifiedTime: string
	createdTime: string
	md5Checksum: string
    //webContentLink: string
}
