<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {Button, ProgressCircular} from 'svelte-materialify/src';
    import loader from '@beyonk/async-script-loader';
    import googleDriveIcon from './google-drive.svg';
    import ClientConfig = gapi.auth2.ClientConfig;
    import GoogleUser = gapi.auth2.GoogleUser;
    import SigninOptions = gapi.auth2.SigninOptions;

    export let config: ClientConfig;
    export let text = 'Sign in with Google';

    const dispatch = createEventDispatcher();
    let googleAuth: gapi.auth2.GoogleAuth;
    let disabled: boolean = true;
    let loading: boolean = false;
    let signedIn: boolean = false;

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
            }
        })
    }

    function updateSignInStatus(isSignedIn: boolean) {
        signedIn = isSignedIn;
        dispatch('sign', {isSignedIn});
        if (isSignedIn) {
            const user: GoogleUser = googleAuth.currentUser.get();
            dispatch('sign-in', {user});
        } else {
            dispatch('sign-out');
        }
    }

    function handleInitialisationError(e) {
        console.error('gauth initialisation error', e);
        dispatch('init-error', {error: e});
    }

    const onClick = () => {
        signIn()
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

    const onSignOutClick = () => {
        googleAuth.signOut();
    }
</script>

<Button tile {disabled} on:click={onClick} class="google-auth">
    {#if loading}
        <ProgressCircular size={50} indeterminate color="primary"/>
    {:else}
        <img src={googleDriveIcon} alt="Google"/>
    {/if}
    <span>{text}</span>
</Button>


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

