<template>
<div>
    <div class="">
        <Table v-bind:rows="rows" v-bind:headers="headers"></Table>
    </div>
    <Modal header="Добавление оборудования">
        <EquipmentFormModal 
        />
    </Modal>
</div>
</template>

<script>
import { Table, Modal } from 'ui';
import { Equipment } from 'util';
import { EquipmentModel } from 'models';

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
    created: function () {
        Equipment.get().then((items) => {
            this.rows = items.map((item) => ({
                name: item.name,
                cost: item.cost,
                buyDate: item.buyDate,
            }));
        });
    },
};
</script>
