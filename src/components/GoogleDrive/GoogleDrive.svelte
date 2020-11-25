<script lang="ts">
    import {_} from "svelte-i18n";
    import {debounce} from 'lodash';
    import {format, parseISO} from "date-fns";
    import GoogleAuth from "./GoogleAuth.svelte";
    import context, {config as appConfig} from "../../app/Context";
    import * as GoogleDrive from "./GoogleDrive";
    import {GoogleFileMeta} from "../../app/types";
    import {Writable, writable} from "svelte/store";
    import {Button, TextField} from "svelte-materialify";
    import {error, info} from "../Flashes/flashesStore";
    import GoogleUser = gapi.auth2.GoogleUser;
    import BasicProfile = gapi.auth2.BasicProfile;

    console.log(format, parseISO);

    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    let user: GoogleUser = null;
    let profile: BasicProfile = null;
    let files: Writable<GoogleFileMeta[]> = writable<GoogleFileMeta[]>([]);
    let search: string;

    let config = {
        clientId: appConfig.googleClientId,
        apiKey: appConfig.googleApiKey,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        fetch_basic_profile: true,
    }
    const delaySearch = debounce<(string) => void>((q) => update(q), 500)   ;
    const onSearch = () => delaySearch(search);
    const onSignIn = async (event: CustomEvent) => {
        user = event.detail.user;
        profile = user.getBasicProfile();
        await update();
    }

    const update = async (searchTerm?: string) => {
        try {
            let newFiles = await GoogleDrive.listFiles(searchTerm);
            files.update(() => newFiles);
            console.log(newFiles);
            info(`${newFiles.length}`);
        } catch (e) {
            error(e);
        }
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
        <Button on:click={update}>{$_('buttons.update')}</Button>
        <TextField bind:value={search} on:change={onSearch}>
            {$_('search')}
        </TextField>
        <table>
            <thead>
            <tr>
                <th>{$_('files.name')}</th>
                <th>{$_('files.modifiedTime')}</th>
                <td></td>
            </tr>
            </thead>
            <tbody>
            {#each $files as file}
                <tr>
                    <td>{file.name}</td>{@debug context.dateFormat}
                    <td>{format(parseISO(file.modifiedTime), context.dateFormat)}</td>
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