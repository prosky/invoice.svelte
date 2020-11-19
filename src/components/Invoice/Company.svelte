<script lang="ts">
    import { _} from 'svelte-i18n';
    import { Row,Col,Input ,Label} from "sveltestrap";
    import Company from "../../app/classes/Company";
    export let company:Company;
</script>


<div class="company">
    <Row>
        <Col>
            <Label>
                {$_('company.name')}
                <Input type="text" bind:value={company.name} />
            </Label>
        </Col>
        <Col>

        </Col>
    </Row>
</div>