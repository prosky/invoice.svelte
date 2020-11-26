<script lang="ts">
    import {_} from "svelte-i18n";
    import {createEventDispatcher, onMount} from 'svelte';
    import {Button, ListItem, ProgressCircular,Icon} from 'svelte-materialify/src';
    import loader from '@beyonk/async-script-loader';
    import googleDriveIcon from './google-drive.svg';
    import ClientConfig = gapi.auth2.ClientConfig;
    import GoogleUser = gapi.auth2.GoogleUser;
    import SigninOptions = gapi.auth2.SigninOptions;
    import BasicProfile = gapi.auth2.BasicProfile;
    import { mdiLogout } from '@mdi/js';
    export let config: ClientConfig;
    import flashes from '../Flashes/flashes';

    const dispatch = createEventDispatcher();
    let googleAuth: gapi.auth2.GoogleAuth;
    let disabled: boolean = true;
    let loading: boolean = false;
    let signedIn: boolean = false;
    let profile: BasicProfile;

    onMount(() => {
        loading = true;
        loader(
                [{url: 'https://apis.google.com/js/platform.js', type: 'script'}],
                () => window['gapi'],
                () => initialise()
        )
    })

    function initialise() {
        gapi.load('client:auth2', async () => {
            try {
                await gapi.client.init(config);
                googleAuth = gapi.auth2.getAuthInstance();
                googleAuth.isSignedIn.listen(updateSignInStatus);
                updateSignInStatus(googleAuth.isSignedIn.get());
                disabled = false;
                loading = false;
            } catch (e) {
                console.error(e);
                flashes.error(e);
            }
        })
    }

    function updateSignInStatus(isSignedIn: boolean) {
        signedIn = isSignedIn;
        dispatch('sign', {isSignedIn});
        if (isSignedIn) {
            const user: GoogleUser = googleAuth.currentUser.get();
            profile = user.getBasicProfile();
            dispatch('sign-in', {user});
        } else {
            profile = null;
            dispatch('sign-out');
        }
    }

    function handleInitialisationError(e) {
        console.error('gauth initialisation error', e);
        dispatch('init-error', {error: e});
    }

    async function signIn(options?: SigninOptions) {
        try {
            await googleAuth.signIn(options);
        } catch (error) {
            if (error.error === 'popup_blocked_by_browser') {
                await signIn({ux_mode: 'redirect'});
            } else {
                dispatch('sign-error', {error});
            }
        }
    }

    const onSignInClick = () => {
        signIn()
    }
    const onSignOutClick = () => {
        googleAuth.signOut();
    }
</script>
<ListItem multiline>
    <span slot="prepend" class="mr-3">
        {#if loading}
            <ProgressCircular size={32} indeterminate color="primary"/>
        {:else}
            <img width="32" src={googleDriveIcon} alt="Google"/>
        {/if}
    </span>
    {#if profile}
        <div>
            {profile.getName()}
        </div>
        <small>{profile.getEmail()}</small>
    {:else}
        <Button on:click={onSignInClick}>
            {$_('google.signIn')}
        </Button>
    {/if}
    <span slot="append">
    {#if profile}
        <Button icon title={$_('google.signOut')} on:click={onSignOutClick}>
        <Icon path={mdiLogout}/>
        </Button>
    {/if}
    </span>
</ListItem>

<style type="scss">
    :global {
        button.google-auth {
            width: 100%;
            border: 0;
            background-color: #4285F4;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
            padding: 5px 1px;
            cursor: pointer;

            &:disabled {
                background-color: grey;
            }

            img {
                background: white;
                padding: 4px;
                height: 30px;
                width: 30px;
                border-radius: 2px;
                margin: 4px;
            }

            span {
                font-family: Roboto, sans-serif;
                font-size: 14px;
                font-weight: bold;
                padding: 0 12px;
                color: white;
            }
        }
    }
</style>

