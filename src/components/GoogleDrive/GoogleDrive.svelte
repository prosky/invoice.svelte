<script context="module" lang="ts">
    import SimpleCache from "./SimpleCache";
    import type {GoogleFileMeta} from "../../app/types";

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
    import {Button, Icon, List, ListItem, TextField} from "svelte-materialify/src";
    import {debug} from "../Debugger/debug";
    import {mdiCloudUpload, mdiDelete, mdiSyncCircle} from '@mdi/js';
    import flash, {info} from "../Flashes/flashes";
    import GoogleUser = gapi.auth2.GoogleUser;
    import BasicProfile = gapi.auth2.BasicProfile;
    import GDrive from "./GDrive";
    import {deserialize, serialize} from "../../app/utils/serialize";
    import {onMount} from "svelte";

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
            const token = gapi.client.getToken();
            GDrive.init();
            GDrive.setAccessToken(token.access_token);
            const response: Response = await GDrive.files.download(file.id);
            const json = await response.text();
            const object = deserialize(json);
            // const json = await GoogleDrive.download(file.webContentLink);
            console.log(object);
            info('File downloaded');
        } catch (e) {
            flash.error(e)
            console.log(e);
        }
    }

    const remove = async (file: GoogleFileMeta) => {
        try {
            info('Uploading file');
            const jsonData = serialize(context.data);
            console.log('Uploading file ', jsonData);
            const token = gapi.client.getToken();
            GDrive.init();
            GDrive.setAccessToken(token.access_token);
            const response: Response = await GDrive.files.delete(file.id);
            console.log(response);
            console.log(await response.text());
            await update(true);
        } catch (e) {
            flash.error(e)
            console.log(e);
        }
    }

    const upload = async () => {
        try {
            info('Uploading file');
            const invoice= context.data;
            const jsonData = serialize(invoice);
            console.log('Uploading file ', jsonData);
            const token = gapi.client.getToken();
            GDrive.init();
            GDrive.setAccessToken(token.access_token);
            const response: Response = await GDrive.files.createFileMultipart(jsonData, 'application/json',{
                'name': `${invoice.title}.json`,
                'mimeType':  'application/json'
            });
            console.log(response);
            console.log(await response.text());
            await update(true);
        } catch (e) {
            flash.error(e)
            console.log(e);
        }
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

    const formatTextDate = (text: string, dateFormat: string) => {
        let date: Date;
        try {
            date = parseISO(text);
        } catch (e) {
            return '';
        }
        try {
            return format(date, context.dateFormat)
        } catch (e) {
            return format(date, 'd. M. yyyy')
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
