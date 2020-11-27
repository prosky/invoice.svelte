<script context="module" lang="ts">
    import SimpleCache from "./SimpleCache";
    import type {GoogleFileMeta} from "../../app/types";

    const cache = new SimpleCache<string, GoogleFileMeta[]>();

</script>
<script lang="ts">
    import type GoogleUser from 'gapi.auth2.';
    import type BasicProfile from 'gapi.auth2';
    import type {Writable} from "svelte/store";

    import {_} from "svelte-i18n";
    import {debounce} from 'lodash';
    import parseISO from "date-fns/parseISO";
    import format from "date-fns/format";
    import GoogleAuth from "./GoogleAuth.svelte";
    import app from "../../app";
    import * as GoogleDrive from "./GoogleDrive";
    import {writable} from "svelte/store";
    import {Button, Icon, List, ListItem, TextField, ProgressCircular} from "svelte-materialify";
    import {debug} from "../Debugger/debug";
    import {mdiAlphaL, mdiCloudUpload, mdiDelete, mdiSyncCircle} from '@mdi/js';
    import flash, {info} from "../Flashes/flashes";
    import GDrive from "./GDrive";
    import {deserialize, serialize} from "../../app/utils/serialize";
    import type Invoice from "../../app/classes/Invoice";

    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    let user: GoogleUser;
    let profile: BasicProfile;
    let files: Writable<GoogleFileMeta[]> = writable<GoogleFileMeta[]>([]);
    let lastQuery: string = null;
    let query: string;
    let uploading: boolean = false;
    let currentData: Invoice;

    app.dataStorage.subscribe((data:Invoice)=>{
        currentData = data;
    });


    let config = {
        clientId: app.config.googleClientId,
        apiKey: app.config.googleApiKey,
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
            app.dataStorage.set(object);
            info('File downloaded');
        } catch (e) {
            flash.error(e)
            console.log(e);
        }
    }

    const remove = async (file: GoogleFileMeta) => {
        try {
            info('Removing file '+file.name);
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
            uploading = true;
            info('Uploading file');
            const invoice = currentData;
            const jsonData = serialize(invoice);
            console.log('Uploading file ', jsonData);
            const token = gapi.client.getToken();
            GDrive.init();
            GDrive.setAccessToken(token.access_token);
            const response: Response = await GDrive.files.createFileMultipart(jsonData, 'application/json', {
                'title': `${invoice.title}`,
                'name': `${invoice.title}`,
                'filename': `${invoice.title}.json`,
                'mimeType': 'application/json'
            });
            console.log(response);
            console.log(await response.text());
            await update(true);
        } catch (e) {
            flash.error(e)
            console.log(e);
        } finally {
            uploading = false;
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
            return format(date, dateFormat || app.settings.dateFormat)
        } catch (e) {
            debug(e);
            return format(date, 'dd/MM/yyyy');
        }
    }

    const formatTextDate = (text: string, dateFormat: string) => {
<<<<<<< HEAD
        let date: Date;
        try {
            date = parseISO(text);
        } catch (e) {
            return '';
        }
        try {
            return format(date, app.settings.dateFormat)
        } catch (e) {
=======
       let date:Date;
        try{
            date = parseISO(text);
        }catch (e){
            return '';
        }
        try{
            return format(date, context.dateFormat)
        }catch (e) {
>>>>>>> fc8a690979296752de61d5c156b8038d52153d93
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
    <Button disabled={uploading} active={uploading} size="large" depressed block on:click={()=>upload()}
            class="primary-text">
        {#if uploading}
            <ProgressCircular size={24} indeterminate color="primary mr-3"/>
        {:else}
            <Icon class="primary mr-3" path="{mdiCloudUpload}"/>
        {/if}
        {$_('google.upload')}
    </Button>
</div>
