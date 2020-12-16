<script lang="ts" context="module">
    let i = 0;
    const uuid = () => `dropzone-${i++}`
</script>

<script lang="ts">
    import Dropzone, {DropzoneOptions} from 'dropzone';
    import {onMount} from "svelte";

    Dropzone.autoDiscover = false;

    type Event = [string, Function];
    export let events: Event[] = [];
    export let options: DropzoneOptions = {};
    export let dropzoneClass = "dropzone";
    export let hooveringClass = "dropzone-hoovering";
    export let id = uuid();

    let dropzoneElement: HTMLDivElement;


    onMount(() => {
        options.url = '#';
        options.previewTemplate = options.previewTemplate || "<div/>";
        options.dictDefaultMessage = options.dictDefaultMessage || "";

        const svDropzone = new Dropzone(`div#${dropzoneElement.id}`, {...options});

        svDropzone.on("addedfile", f => {
            dropzoneElement.classList.remove(hooveringClass);
        });
        svDropzone.on("dragenter", e => {
            console.log(dropzoneElement);
            dropzoneElement.classList.toggle(hooveringClass);
        });
        svDropzone.on("dragleave", e => {
            dropzoneElement.classList.toggle(hooveringClass);
        });
        events.forEach(([eventKey, eventFunc]) => svDropzone.on(eventKey, eventFunc));
        svDropzone.on("error", (file, errorMessage) => {
            console.log(`Error: ${errorMessage}`);
        });
    });
</script>

<style type="scss">
  @import "../src/scss/material-theme";
  .dropzone {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    transition: outline-color 300ms ease-out;
    outline: 2px solid transparent;
  }

  .dropzone.dropzone-hoovering {
    outline-color: $primary-color;
    background: rgba(255, 62, 0, 0.05);
  }

  :global {
    .dz-button:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>

<div {id} bind:this={dropzoneElement} class={dropzoneClass}>
    <slot/>
</div>
