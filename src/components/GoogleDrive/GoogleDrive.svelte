<script lang="ts">
    import {_} from "svelte-i18n";
    import GoogleAuth from "./GoogleAuth.svelte";
    import {config as appConfig} from "../../app/Context";
    import * as GoogleDrive from "./GoogleDrive";
    import {GoogleFileMeta} from "../../app/types";
    import GoogleUser = gapi.auth2.GoogleUser;
    import BasicProfile = gapi.auth2.BasicProfile;

    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    let user: GoogleUser = null;
    let profile: BasicProfile = null;
    let files: GoogleFileMeta[] = [];

    $: files = [];

    let config = {
        clientId: appConfig.googleClientId,
        apiKey: appConfig.googleApiKey,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        fetch_basic_profile: true,
    }

    const onSignIn = async (event: CustomEvent) => {
        user = event.detail.user;
        profile = user.getBasicProfile();
        files = await GoogleDrive.listFiles();
        console.log(files);
    }
    const onSignOut = (event: CustomEvent) => {
        user = null;
        profile = null;
    }

    const download = async (file: GoogleFileMeta) => {
        const json = await GoogleDrive.download(file.webContentLink);
        console.log(json);
    }

</script>


<div class="google-drive">
    {#if user}
        <div>
            {profile.getName()}
            {profile.getFamilyName()}
            {profile.getEmail()}
        </div>
        <table>
            <tbody>
            {#each files as file (file.id)}
                <tr>
                    <td>{file.id}</td>
                    <td>{file.name}</td>
                    <td>{file.modifiedTime}</td>
                    <td>{file.mimeType}</td>
                    <td>
                        <Button on:click={()=>download(file)}>
                            {$_('select')}
                        </Button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    {:else}
        <GoogleAuth {config} on:sign-in={onSignIn} on:sign-out={onSignOut}/>
    {/if}
</div>
<style type="scss">
    .google-drive {

    }
</style>