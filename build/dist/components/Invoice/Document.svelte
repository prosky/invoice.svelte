<script lang="ts">
	import type Invoice from "../../app/classes/Invoice";
	import {_} from 'svelte-i18n';
	import {Col, Row, Textarea, TextField} from "svelte-materialify/src";
	import Company from "./Company.svelte";
	import Summary from "./Summary.svelte";
	import Products from "./Products.svelte";
	import DatePicker from "../Inputs/DatePicker/DatePicker.svelte";
	import ImagePicker from "../Inputs/ImagePicker/ImagePicker.svelte";

	export let invoice: Invoice;
</script>


<div class="document">
	<div class="page">
		<Row class="mb-4">
			<Col>
				<Row>
					<Col>
						<TextField placeholder={$_('invoice.title')} bind:value={invoice.labels.title}/>
					</Col>
					<Col>
						<TextField placeholder={$_('invoice.title')} bind:value={invoice.title}/>
					</Col>
				</Row>
				<Row>
					<Col>
						<TextField placeholder={$_('invoice.date')} bind:value={invoice.labels.date}/>
					</Col>
					<Col>
						<DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.date')}
									bind:selected={invoice.date}/>
					</Col>
				</Row>
				<Row>
					<Col>
						<TextField placeholder={$_('invoice.dueDate')} bind:value={invoice.labels.dueDate}/>
					</Col>
					<Col>
						<DatePicker bind:dateFormat={invoice.dateFormat} placeholder={$_('invoice.dueDate')}
									bind:selected={invoice.dueDate}/>
					</Col>
				</Row>
			</Col>
			<Col>
				<ImagePicker bind:value={invoice.logo}/>
			</Col>
		</Row>
		<Row class="mb-4">
			<Col>
				<TextField class="mb-3" placeholder={$_('invoice.company')} bind:value={invoice.labels.company}/>
				<Company bind:company={invoice.company}/>
			</Col>
			<Col>
				<TextField class="mb-3" placeholder={$_('invoice.client')} bind:value={invoice.labels.client}/>
				<Company bind:company={invoice.client}/>
			</Col>
		</Row>
		<div class="mb-4">
			<Products bind:invoice/>
		</div>
		<div class="mb-6">
			<Summary bind:invoice/>
		</div>
		<div class="mb-6">
			<TextField placeholder={$_('invoice.notes')} bind:value={invoice.labels.notes}/>
			<Textarea bind:value={invoice.notes} rows={3}/>
		</div>
		<div>
			<TextField placeholder={$_('invoice.terms')} bind:value={invoice.labels.terms}/>
			<Textarea bind:value={invoice.terms} rows={3}/>
		</div>
	</div>
</div>

<style>
	.document {
		--theme-text-fields-border: transparent;
	}
	.page {
		position: relative;
		width: 21cm;
		min-height: 29.7cm;
		box-sizing: border-box;
		padding: 1cm;
		margin: auto;
		box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.8);
	}
</style>
