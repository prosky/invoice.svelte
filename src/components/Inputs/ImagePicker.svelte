<script lang="ts">

    export let format = (val) => items[val];
    export let value: any;

</script>


<div class="image-picker">
    <input type="file">
    <slot/>
</div>