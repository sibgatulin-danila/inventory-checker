<template>
    <div class="container">
        <Table v-bind:rows="rows" v-bind:headers="headers"></Table>
    </div>
</template>

<script>
import { Table } from 'ui';
import { Equipment } from 'util';

export default {
    name: 'Equipment',
    components: {
        Table,
    },
    data: function() {
        const headers = ['Название оборудования', 'еще что-то'];
        return {
            rows: [],
            headers,
        };
    },
    created: async function() {
        this.rows = await Equipment.get();
    },
};
</script>
