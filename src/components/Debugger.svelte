<script>

    let active = false;
    close = () => {
        active = false
    };
    open = () => {
        active = true
    };
</script>

<div class="debugger">
    <slot/>
</div>

<style type="scss">
    .debugger {
        padding: 10px;
        position: fixed;
        bottom: 0;
        right: 0;
        background: #fff;
        color: #000;
    }
</style>