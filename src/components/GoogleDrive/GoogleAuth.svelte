<script type="ts">
    import {createEventDispatcher, onMount} from 'svelte'
    import loader from '@beyonk/async-script-loader'

    const SCOPES = 'https://www.googleapis.com/auth/drive.file';
    const API_KEY = 'AIzaSyA1eIPh_ZCVZ0WWJXdFioYt5FOD3xkb2Ow';
    const CLIENT_ID = '577456712255-k39mpm5tvl8amvfet8e53ebe1vjsjpuo.apps.googleusercontent.com';

    const dispatch = createEventDispatcher();

    export let clientId = CLIENT_ID;
    export let text = 'Sign in with Google';

    let signinCta;
    let disabled = true;
    let GoogleAuth

    onMount(() => {
        loader(
            [{type: 'script',url: '//apis.google.com/js/api:client.js'}],
            () => window['gapi'],
            () => initialise()
        )
    })

    function initialise() {
        gapi.load('auth2', async () => {
            GoogleAuth = gapi.auth2.init({client_id: clientId})
            GoogleAuth.then(attachHandler, handleInitialisationError)
        })
    }

    function attachHandler() {
        GoogleAuth.attachClickHandler(signinCta, {},
            () => dispatch('auth-success', {user: GoogleAuth.currentUser.get()}),
            e => dispatch('auth-failure', {error: e})
        )
        disabled = false
    }

    function handleInitialisationError(e) {
        console.error('gauth initialisation error', e)
        dispatch('init-error', {error: e})
    }
</script>
<style>
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
    }

    button.google-auth:disabled {
        background-color: grey;
    }

    .google-auth img {
        background: white;
        padding: 4px;
        height: 30px;
        width: 30px;
        border-radius: 2px;
        margin: 4px;
    }

    .google-auth span {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: bold;
        padding: 0 12px;
        color: white;
    }
</style>
<button bind:this={signinCta} {disabled} class="google-auth">
    <img src='./images/google-drive.svg' alt="Google"/>
    <span>{text}</span>
</button>
