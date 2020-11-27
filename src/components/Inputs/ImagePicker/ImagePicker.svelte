<script lang="ts">
    import {_} from 'svelte-i18n';
    import {Button, Icon, Overlay, ProgressCircular} from "svelte-materialify";
    import {mdiClose} from '@mdi/js';
    import {readFile, resizeImage} from "./fileUtils";
    import DropZone from "../DropZone.svelte";
    import {DropzoneOptions} from "dropzone";
    import {error} from "../../Flashes/flashes";

    export let value: string;
    export let maxWidth: number | undefined = 360;
    export let maxHeight: number | undefined = 360;

    let loading = false;
    //let files: FileList;
    const setImage = async (file: File) => {
        loading = true;
        try {
            if ((/image\/svg.*/i.exec(file.type))) value = await readFile(file);
            else value = await resizeImage(file, maxWidth, maxHeight);
        } catch (e) {
            error($_('Unable to select this image'));
            console.error(e);
        }
        loading = false;
    }
    const events = Object.entries({addedfile: setImage})
    const options: DropzoneOptions = {
        acceptedFiles: 'image',
        createImageThumbnails: false,//Must be specified or browser will freeze
        maxFilesize: null,//Must be specified or browser will freeze
    };
    const remove = () => value = undefined;
    let i = 0;
    //$: files?.length && setImage(files[0]);
</script>

<div class="image-picker">
    <div class="close" class:d-none={!value}>
        <Button on:click={remove} icon class="red white-text">
            <Icon path={mdiClose}/>
        </Button>
    </div>
    <Overlay absolute color="transparent" active={loading}>
        <ProgressCircular color="primary" indeterminate size={128}/>
    </Overlay>
    <DropZone {events} {options}>
         <span class="preview">
            {#if value}
                <img alt="Preview" src={value}>
            {:else}
                <span>Select logo</span>
            {/if}
        </span>
    </DropZone>
</div>

<style type="scss">
  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .close {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    transition: opacity .35s ease;
    transform: translate(50%, -50%);
  }

  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .image-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 360px;
    transition: background-color .35s ease;

    &:hover {
      background-color: #e0e0e0;

      .close {
        opacity: 1;
      }
    }

    img {
      max-width: 100%;
    }
  }
</style>