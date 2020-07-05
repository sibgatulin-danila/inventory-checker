<template>
    <div class="container">
        <Table v-bind:rows="rows" v-bind:headers="headers"></Table>
        <Modal header="Добавление оборудования">
            <EquipmentForm />
        </Modal>
    </div>
</template>

<script>
import { Table, Modal } from 'ui';
import { Equipment } from 'util';

import { EquipmentForm } from './components';

export default {
    name: 'Equipment',
    components: {
        Table,
        Modal,
        EquipmentForm,
    },
    data: function () {
        const headers = ['Название оборудования', 'еще что-то'];
        return {
            rows: [],
            headers,
        };
    },
    created: async function () {
        this.rows = await Equipment.get();
    },
};
</script>
