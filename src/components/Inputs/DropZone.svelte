<script type="ts" context="module">
    let i = 0;
    const uuid = () => `dropzone-${i++}`
</script>

<script type="ts">
    import Dropzone from 'dropzone';
    import {onMount} from "svelte";

    Dropzone.autoDiscover = false;

    export let events: [[string,Function]] = [];
    export let options = {previewTemplate: "<div/>"};
    export let dropzoneClass = "dropzone";
    export let hooveringClass = "dropzone-hoovering";
    export let id = uuid();
    export let autoDiscover = false;

    let dropzoneElement: HTMLDivElement;

    onMount(() => {
        options.url = '#';
        if (!options.previewTemplate) {
            options.previewTemplate = "<div/>";
        }
        if (!options.dictDefaultMessage) {
            options.dictDefaultMessage = "";
        }
        const svDropzone = new Dropzone(`div#${dropzoneElement.id}`, {...options});
        if (autoDiscover !== true) {
            svDropzone.autoDiscover = false;
        }

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
        if (options.clickable !== false) {
            dropzoneElement.style.cursor = "pointer";
        }
        svDropzone.on("error", (file, errorMessage) => {
            console.log(`Error: ${errorMessage}`);
        });
    });
</script>

<style type="scss">
  .dropzone {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    transition: all 300ms ease-out;
  }

  .dropzone.dropzone-hoovering {
    border: 2px solid #ff3e00;
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
