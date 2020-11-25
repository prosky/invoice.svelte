<script context="module" lang="ts">
    import SimpleCache from "./SimpleCache";
    import {GoogleFileMeta} from "../../app/types";
    const cache = new SimpleCache<string, GoogleFileMeta[]>();

</script>
<script lang="ts">
    import {_} from "svelte-i18n";
    import {debounce} from 'lodash';
    import parseISO from "date-fns/parseISO";
    import format from "date-fns/format";
    import GoogleAuth from "./GoogleAuth.svelte";
    import context, {config as appConfig} from "../../app/Context";
    import * as GoogleDrive from "./GoogleDrive";
    import {Writable, writable} from "svelte/store";
    import {Button, Icon, List, ListItem, TextField} from "svelte-materialify";
    import {debug} from "../Debugger/debug";
    import {mdiCloudUpload, mdiDelete, mdiSyncCircle} from '@mdi/js';
    import flash from "../Flashes/flashesStore";
    import GoogleUser = gapi.auth2.GoogleUser;
    import BasicProfile = gapi.auth2.BasicProfile;

    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    let user: GoogleUser;
    let profile: BasicProfile;
    let files: Writable<GoogleFileMeta[]> = writable<GoogleFileMeta[]>([]);
    let lastQuery: string = null;
    let query: string;


    let config = {
        clientId: appConfig.googleClientId,
        apiKey: appConfig.googleApiKey,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        fetch_basic_profile: true,
    }
    const delaySearch = debounce<() => void>(() => update(), 500);
    const onSignIn = async (event: CustomEvent) => {
        user = event.detail.user;
        profile = user.getBasicProfile();
        await update();
    }

    const update = async (force: boolean = false) => {
        console.log({force, lastQuery, query});
        if (!force && lastQuery === query) return;
        lastQuery = query;
        try {
            let cached = null;
            console.log({cached});
            if (!force) {
                cached = cache.get(query);
                console.log({cached});
            }
            console.log({cached});
            if (cached) {
                flash.info('updating cached');
                files.update(() => cached);
            } else {
                let newFiles = await GoogleDrive.listFiles(query);
                cache.add(query, newFiles);
                flash.info('updating');
                files.update(() => newFiles);
            }
        } catch (e) {
            console.error(e);
            debug(e).type('error');
        }
    }

    const onSignOut = (event: CustomEvent) => {
        user = null;
        profile = null;
    }

    const download = async (file: GoogleFileMeta) => {
        try {
            const json = await GoogleDrive.download(file.webContentLink);
            console.log(json);
        } catch (e) {
            flash.error(e)
            console.log(e);
        }
    }

    const remove = async (file: GoogleFileMeta) => {

    }

    const upload = async () => {

    }

    const stringDateFormat = (dateString: string, dateFormat?: string) => {
        let date;
        try {
            date = parseISO(dateString);
        } catch (e) {
            debug(e);
            return '';
        }
        try {
            return format(date, dateFormat || context.dateFormat)
        } catch (e) {
            debug(e);
            return format(date, 'dd/MM/yyyy');
        }
    }

</script>


<div class="google-drive">
    <GoogleAuth {config} on:sign-in={onSignIn} on:sign-out={onSignOut}/>
    <TextField dense filled clearable bind:value={query}
               on:change={delaySearch} on:blur={()=>update()}
               on:keyup={(e)=>e.key==='Enter' && update()}>
        {$_('search')}
            <span slot="append">
                <Button icon on:click={()=>update(true)} title={$_('buttons.update')}>
                    <Icon path={mdiSyncCircle}/>
                </Button>
            </span>
    </TextField>
    <List>
        {#each $files as file}
            <ListItem on:click={()=>download(file)}>
                {file.name}
                <span slot="subtitle"> {stringDateFormat(file.modifiedTime)}</span>
                <span slot="append">
                        <Button icon on:click={()=>remove(file)}>
                            <Icon path="{mdiDelete}"/>
                        </Button>
                    </span>
            </ListItem>
        {/each}
    </List>
    <Button size="large" depressed block on:click={()=>upload()} class="primary-text">
        <Icon class="primary mr-3" path="{mdiCloudUpload}"/>
        {$_('google.upload')}
    </Button>
</div>
