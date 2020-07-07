<template>
    <div class="container">
        <Table v-bind:rows="rows" v-bind:headers="headers"></Table>
        <Modal header="Добавление оборудования">
            <EquipmentFormModal />
        </Modal>
    </div>
</template>

<script>
import { Table, Modal } from 'ui';
import { Equipment } from 'util';
import {EquipmentModel} from 'models';

import { EquipmentFormModal } from './components';

export default {
    name: 'Equipment',
    components: {
        Table,
        Modal,
        EquipmentFormModal,
    },
    data: function () {
        const headers = EquipmentModel.HEADERS;
        return {
            rows: [],
            headers,
        };
    },
    created: async function () {
        this.rows = await Equipment.get().map(item => item.formData());
    },
};
</script>
