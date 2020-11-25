<script>
    import formatHighlight from "json-format-highlight";
    export let data = {};
    export let indent = 2; // spaces

    // formatHighlight - Define your exclusive color scheme
    export let colorOptions = {
        keyColor: "dimgray",
        numberColor: "lightskyblue",
        stringColor: "lightcoral",
        trueColor: "lightseagreen",
        falseColor: "#f66578",
        nullColor: "cornflowerblue"
    };

    let isPropsValid = false;
    $: formattedHighlight = formatHighlight(JSON.stringify(data, null, indent), colorOptions);
</script>

<style>
    pre {
        box-sizing: border-box;
        background-color: #efefef;
    }
    pre code {
        font-size: 12px;
        line-height: 20px;
    }
</style>

<pre>
    <code>
      {@html formattedHighlight}
    </code>
</pre>