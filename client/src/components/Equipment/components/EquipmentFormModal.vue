<template>
    <form v-on:submit="handleSubmit">
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
    props: {
        onSubmit: {
            type: Function,
            default: () => {},
        },
    },
    data: function () {
        return {
            equipment: new EquipmentModel(),
        };
    },
    methods: {
        handleSubmit: function (e) {
            e.preventDefault();
            Equipment.create(this.equipment.formData()).then(() => {
                console.log(this.equipment);
                this.onSubmit(this.equipment);
                this.equipment.name = '';
                this.equipment.buyDate = '';
                this.equipment.cost = '';
                // console.log(this.equipment);
            });
        },
        onChange: function ({ name, value }) {
            this.equipment[name] = value;
        },
    },
};
</script>
