<script context="module" lang="ts">
	import SimpleCache from "../../app/utils/SimpleCache";
	import type {GoogleFileMeta} from "../../app/types";
	import Invoice from "../../app/classes/Invoice";

	const MIME = 'application/json';
	const cache = new SimpleCache<string, GoogleFileMeta[]>();
	const fileInfo = (invoice: Invoice) => ({
		//'title': `${invoice.title}`,
		'name': `${invoice.title || invoice.hash}.json`,
		//'filename': `${invoice.title}.json`,
		'mimeType': MIME
	});
</script>
<script lang="ts">
	import GoogleUser = gapi.auth2.GoogleUser;
	import BasicProfile = gapi.auth2.BasicProfile;

	import type {Writable} from "svelte/store";
	import type Invoice from "app/classes/Invoice";
	import type {Settings} from "app/classes/Application";

	import {_, date} from "svelte-i18n";
	import {debounce} from 'lodash';
	import parseISO from "date-fns/parseISO";
	import GoogleAuth from "./GoogleAuth.svelte";
	import app from "../../app";
	import * as GoogleDrive from "./GoogleDrive";
	import {writable} from "svelte/store";
	import {Button, Icon, ListItem, TextField} from "svelte-materialify/src";
	import {debug} from "../Debugger/debug";
	import {mdiCloudUpload, mdiDelete, mdiSyncCircle, mdiDownload} from '@mdi/js';
	import flash, {info} from "../Flashes/flashes";
	import GDrive from "./API/GDrive";
	import {deserialize, serialize} from "app/utils/serialize";
	import {doSave, saveCallback} from 'app/utils/helpers';
	import LoadingButton from "../LoadingButton.svelte";

	const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
	const SCOPES = 'https://www.googleapis.com/auth/drive.file';

	let user: GoogleUser;
	let profile: BasicProfile;
	let files: Writable<GoogleFileMeta[]> = writable<GoogleFileMeta[]>([]);
	let lastQuery: string = null;
	let query: string;
	let uploading: boolean = false;
	let invoice: Invoice;
	let settings: Settings;

	app.invoice.subscribe((data: Invoice) => {
		invoice = data;
	});
	app.settings.subscribe((data: Settings) => {
		settings = data;
	});

	let config = {
		clientId: app.config.googleClientId,
		apiKey: app.config.googleApiKey,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES,
		fetch_basic_profile: true,
	}

	const delaySearch = debounce<() => void>(() => listFiles(), 500);

	const onSignIn = async (event: CustomEvent) => {
		user = event.detail.user;
		profile = user.getBasicProfile();
		const token = gapi.client.getToken();
		GDrive.init();
		GDrive.setAccessToken(token.access_token);
		await listFiles();
	}

	const listFiles = async (force: boolean = false) => {
		console.debug({force, lastQuery, query});
		if (!force && lastQuery === query) return;
		lastQuery = query;
		try {
			let cached = null;
			if (!force) {
				cached = cache.get(query);
			}
			if (cached) {
				console.debug('updating cached', cached);
				files.set(cached);
			} else {
				let newFiles = await GoogleDrive.listFiles(query);
				cache.add(query, newFiles);
				console.debug('updating', newFiles);
				files.set(newFiles);
			}
		} catch (e) {
			console.error(e);
			debug(e).type('error');
		}
	}

	const onSignOut = (event: CustomEvent) => {
		user = null;
		profile = null;
		GDrive.setAccessToken(undefined);
	}

	const download = saveCallback(async (file: GoogleFileMeta) => {
		const response: Response = await GDrive.files.download(file.id);
		const json = await response.text();
		const object = deserialize(json);
		object.fileId = file.id;
		console.debug('File downloaded', object);
		app.invoice.set(object);
	}, flash.error);

	const remove = saveCallback(async (file: GoogleFileMeta) => {
		console.debug('Removing file ' + file.name);
		const response: Response = await GDrive.files.delete(file.id);
		console.log(response);
		console.log(await response.text());
		cache.clear();
		await listFiles(true);
	}, flash.error);

	const upload = saveCallback(async () => {
		uploading = true;
		info('Uploading file');
		const jsonData = serialize(invoice);
		console.log('Uploading file ', jsonData);
		const response: Response = await GDrive.files.createFileMultipart(jsonData, MIME, fileInfo(invoice));
		let data = await response.json();
		app.invoice.update((invoice: Invoice) => {
			invoice.fileId = data.id;
			return invoice;
		});
		await listFiles(true);
	}, flash.error, () => uploading = false);


	const update = saveCallback(async () => {
		uploading = true;
		info.section('fileUpdate')('Updating file ' + invoice.title);
		const jsonData = serialize(invoice);
		console.debug('Updating file ', jsonData);
		const response: Response = await GDrive.files.updateFile(invoice.fileId, jsonData, MIME, fileInfo(invoice));
		if (response.status === 404) {
			return upload();
		}
		console.debug(response);
		await listFiles(true);
	}, flash.error, () => uploading = false);

	const strToDate = (dateString: string) => doSave(() => parseISO(dateString), '');
</script>


<div class="google-drive">
	<GoogleAuth {config} on:sign-in={onSignIn} on:sign-out={onSignOut}/>
	<TextField dense filled clearable bind:value={query}
			   on:change={delaySearch} on:blur={()=>listFiles()}
			   on:keyup={(e)=>e.key==='Enter' && listFiles()}>
		{$_('google.search')}
		<span slot="append">
                <Button icon on:click={()=>listFiles(true)} title={$_('buttons.update')}>
                    <Icon path={mdiSyncCircle}/>
                </Button>
            </span>
	</TextField>
	<div class="list">
		{#each $files as file}
			<ListItem>
				{file.name}
				<span slot="subtitle">
					{$date(strToDate(file.createdTime), {dateStyle: 'short', timeStyle: 'medium'})}<br>
					{$date(strToDate(file.modifiedTime), {dateStyle: 'short', timeStyle: 'medium'})}<br>
					<span title={file.md5Checksum}>{file.md5Checksum}</span>
				</span>
				<span slot="append">
					 <Button icon class="primary-text" on:click={()=>download(file)}>
                            <Icon path="{mdiDownload}"/>
                        </Button>
                        <Button icon on:click={()=>remove(file)}>
                            <Icon path="{mdiDelete}"/>
                        </Button>
                    </span>
			</ListItem>
		{/each}
	</div>

	<LoadingButton loading={uploading} size="large" depressed block class="primary-text"
				   on:click={invoice.fileId?()=>update():()=>upload()} icon={mdiCloudUpload}>
		{invoice.fileId ? $_('google.update') : $_('google.upload')}
	</LoadingButton>
</div>
<style>
	.list {
		overflow: auto;
		max-height: 100%;
	}
</style>
