<script lang="ts" context="module">
    const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                let width = image.width;
                let height = image.height;
                if (width <= maxWidth && height <= maxHeight) {
                    resolve(file);
                }
                let newWidth;
                let newHeight;
                if (width > height) {
                    newHeight = height * (maxWidth / width);
                    newWidth = maxWidth;
                } else {
                    newWidth = width * (maxHeight / height);
                    newHeight = maxHeight;
                }
                let canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                let context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, newWidth, newHeight);
                resolve(canvas.toDataURL(file.type, 85));
            };
            image.onerror = reject;
        });
    }
</script>

<script lang="ts">
    import {Overlay, ProgressCircular, Button, Icon} from "svelte-materialify/src";
    import {mdiClose} from '@mdi/js';
    import DropZone from "./DropZone.svelte";

    export let value: string | undefined;
    export let maxWidth: number | undefined = 360;
    export let maxHeight: number | undefined = 360;

    const initialValue = async () => value;

    let input: HTMLInputElement;
    let promise = initialValue();
    let loading = false;

    const setImage = (image: string | ArrayBuffer) => {
        loading = false;
        console.log('setImage', image);
        if (image instanceof ArrayBuffer) {
            value = String.fromCharCode.apply(null, new Uint16Array(image));
        } else {
            value = image;
        }
    };
    const finish = () => {
        loading = false;
    }

    const readFile = (file: File) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImage(reader.result));
        reader.addEventListener('error', finish);
        reader.addEventListener('abort', finish);
        reader.readAsDataURL(file);
    }

    const addedfile = (file: File) => {
        console.log(file.type);
        if ((/image\/svg.*/i.exec(file.type))) {
            console.log('SVG');
            readFile(file);
        } else {
            loading = true;
            resizeImage(file, maxWidth, maxHeight).then((dataUrl: string) => {
                setImage(dataUrl);
            }).catch(finish);
        }
    };
    const events = Object.entries({addedfile});
    const options = {
        clickable: true,
        createImageThumbnails: false,
        acceptedFiles: 'image/*'/*, maxFilesize: 256*/
    };
    const remove = () => {
        value = undefined;
    }
</script>

<div class="image-picker">
    {#if value}
        <div class="close">
            <Button on:click={remove} icon class="red white-text">
                <Icon path={mdiClose}/>
            </Button>
        </div>
    {/if}
    <Overlay absolute color="transparent" active={loading}>
        <ProgressCircular color="primary" indeterminate size={128}/>
    </Overlay>
    <DropZone {events} {options}>
        <div class="preview">
            {#if value}
                <img alt="Preview" src={value}>
            {:else}
                <span>Select logo</span>
            {/if}
        </div>
    </DropZone>
    <slot/>
</div>

<style type="scss">
  label {
    cursor: pointer;
  }

  .close {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    transition: opacity .35s ease;
    transform: translate(50%,-50%);
  }

  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .image-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 360px;
    transition: background-color .35s ease;

    &:hover {
      background-color: #e0e0e0;
      .close{
        opacity: 1;
      }
    }

    img {
      max-width: 100%;
    }
  }
</style>