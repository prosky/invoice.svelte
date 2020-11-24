export type Formatter = (number: number, sign?: boolean) => string;
export interface GoogleFileMeta {
    id: string
    name: string
    mimeType: string
    modifiedTime: string
    webContentLink: string
}