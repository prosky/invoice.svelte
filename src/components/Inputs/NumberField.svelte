<script lang="ts" context="module">
	const keyControl = {
		ArrowUp: +1,
		ArrowDown: -1
	};
</script>

<script lang="ts">
	import {tick} from 'svelte';
	import Input from 'svelte-materialify/src/components/Input';
	import Icon from 'svelte-materialify/src/components/Icon';
	import uid from 'svelte-materialify/src/internal/uid';
	import clearIcon from 'svelte-materialify/src/internal/Icons/close';
	import type {Readable} from "svelte/store";

	let _class = '';
	export {_class as class};
	export let value: number | null = null;
	export let color = 'primary';
	export let filled = false;
	export let solo = false;
	export let outlined = false;
	export let flat = false;
	export let dense = false;
	export let rounded = false;
	export let clearable = false;
	export let readonly = false;
	export let disabled = false;
	export let placeholder = null;
	export let hint = '';
	export let counter = false;
	export let messages = [];
	export let rules = [];
	export let errorCount = 1;
	export let validateOnBlur = false;
	export let error = false;
	export let success = false;
	export let id = `s-input-${uid(5)}`;
	export let style = null;
	export let formatter: Readable<(number) => string>;

	let numberToString;

	let focused = false;
	let errorMessages = [];
	let group, decimal, regexp, regexp1, regexp2, labelActive, stringValue;
	//$: stringValue = numberToString(value);
	$: labelActive = Boolean(placeholder) || value || focused;
	$: value = reverseFormatNumber(stringValue);

	formatter.subscribe((format) => {
		if (format !== numberToString) {
			numberToString = format;
			decimal = format(11.11).replace(/1/g, '');
			group = format(1111).replace(/1/g, '').split(decimal)[0]
			regexp = new RegExp('[0-9' + group + decimal + ']', 'i');
			regexp1 = new RegExp('\\' + group, 'g');
			regexp2 = new RegExp('\\' + decimal, 'g');
			stringValue = format(value);
		}
	});

	function reverseFormatNumber(val) {
		if (!val) return 0;
		return  parseFloat(val.replace(regexp1, '').replace(regexp2, '.'));
		//return Number.isNaN(reversedVal) ? 0 : reversedVal;
	}

	function checkRules() {
		errorMessages = rules.map((r) => r(value)).filter((r) => typeof r === 'string');
		error = !!errorMessages.length;
	}

	function onFocus() {
		focused = true;
	}

	function onBlur() {
		focused = false;
		stringValue = numberToString(value);
		if (validateOnBlur) checkRules();
	}

	function clear() {
		value = null;
	}

	function onInput() {
		if (!validateOnBlur) checkRules();
	}

	function onKeypress(event: KeyboardEvent) {
		const isNum = regexp.test(event.key);
		isNum || event.preventDefault();
		return isNum;
	}

	function onKeydown(event: KeyboardEvent) {
		const move = keyControl[event.key];
		if (move !== undefined) {
			event.preventDefault();
			const {selectionStart, selectionEnd, value} = this;
			const start = selectionStart;
			const end = selectionStart === selectionEnd ? selectionStart + 1 : selectionEnd;
			const selection = value.slice(start, end);
			const num = reverseFormatNumber(selection);
			if (!Number.isNaN(num)) {
				const replacement = Math.max(0,num + move);
				stringValue = (
					value.slice(0, start) +
					replacement +
					value.slice(end)
				);
			}
			tick().then(() => {
				this.selectionStart = selectionStart;
				this.selectionEnd = selectionEnd;
			});
			return false;
		}
	}
</script>

<Input
	class="s-text-field {_class}"
	{color}
	{dense}
	{readonly}
	{disabled}
	{error}
	{success}
	{style}>
	<!-- Slot for prepend outside the input. -->
	<slot slot="prepend-outer" name="prepend-outer"/>
	<div
		class="s-text-field__wrapper"
		class:filled
		class:solo
		class:outlined
		class:flat
		class:rounded>
		<!-- Slot for prepend inside the input. -->
		<slot name="prepend"/>

		<div class="s-text-field__input">
			<label for={id} class:active={labelActive}>
				<slot/>
			</label>
			<slot name="content"/>
			<input
				type="text"
				bind:value={stringValue}
				{placeholder}
				{id}
				{readonly}
				{disabled}
				on:blur={onBlur}
				on:focus={onFocus}
				on:input={onInput}
				on:keydown={onKeydown}
				on:keypress={onKeypress}
				on:focus
				on:blur
				on:input
				on:change
				on:keypress
				{...$$restProps}/>
		</div>

		{#if clearable && value !== ''}
			<div on:click={clear} style="cursor:pointer">
				<!-- Slot for the icon when `clearable` is true. -->
				<slot name="clear-icon">
					<Icon path={clearIcon}/>
				</slot>
			</div>
		{/if}

		<!-- Slot for append inside the input. -->
		<slot name="append"/>
	</div>

	<div slot="messages">
		<div>
			<span>{hint}</span>
			{#each messages as message}<span>{message}</span>{/each}
			{#each errorMessages.slice(0, errorCount) as message}<span>{message}</span>{/each}
		</div>
		{#if counter}<span>{value.length} / {counter}</span>{/if}
	</div>

	<!-- Slot for append outside the input. -->
	<slot slot="append-outer" name="append-outer"/>
</Input>
