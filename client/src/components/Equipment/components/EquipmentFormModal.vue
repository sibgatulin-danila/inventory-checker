<template>
    <form v-on:submit="onSubmit">
        <Input
            label="Название оборудования"
            placeholder="Название"
            name="name"
            v-bind:value="equipment.name"
            v-bind:onChange="onChange"
        />
        <Datepicker
            label="Дата покупки"
            placeholder="Дата"
            name="buyDate"
            v-bind:value="equipment.buyDate"
            v-bind:onChange="onChange"
        />
        <Input
            label="Стоимость оборудования"
            placeholder="Стоимость"
            name="cost"
            type="number"
            v-bind:value="equipment.cost"
            v-bind:onChange="onChange"
        />
        <Button class="btn-primary" text="Сохранить" />
    </form>
</template>

<script>
import { Button, Datepicker, Input } from 'ui';
import { EquipmentModel } from 'models';
import { Equipment } from 'services';

export default {
    name: 'EquipmentForm',
    components: {
        Button,
        Datepicker,
        Input,
    },
    data: function () {
        return {
            equipment: new EquipmentModel(),
        };
    },
    methods: {
        onSubmit: function (e) {
            e.preventDefault();
            Equipment.create(this.equipment.formData());
        },
        onChange: function ({name, value}) {
            this.equipment[name] = value;
        }
    },
};
</script>
