// @ts-ignore
import {config} from "dotenv";
import GoogleAuth = gapi.auth2.GoogleAuth;

config(); // I just don't like mixing import and require
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const API_KEY = 'AIzaSyA1eIPh_ZCVZ0WWJXdFioYt5FOD3xkb2Ow';
const CLIENT_ID = '577456712255-k39mpm5tvl8amvfet8e53ebe1vjsjpuo.apps.googleusercontent.com';


export default class GoogleDrive {

    gapi: any;

    auth: GoogleAuth;
    initialized: boolean = false;


    constructor(gapi) {
        console.log(gapi);
        this.gapi = gapi;
    }

    async initClient(options: { updateLoggedInStatus: (status: boolean) => void }) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        try {
            await this.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });
            // Listen for sign-in state changes.
            this.gapi.auth2
                .getAuthInstance()
                .isSignedIn.listen(options.updateLoggedInStatus);

            // Handle the initial sign-in state.
            options.updateLoggedInStatus(
                this.gapi.auth2.getAuthInstance().isSignedIn.get()
            );
        } catch (err) {
            console.error("Caught error", err);
        }
    }



}